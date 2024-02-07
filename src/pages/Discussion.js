import React, { useEffect, useState } from 'react';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import HeaderProfil from '../components/HeaderProfil';
import '../assets/fontawesome-5/css/all.css';
import SideCardContainer from '../components/SideCardContainer';
import Card from '../components/Card';
import DiscussionWindow from '../components/DiscussionWindow';
import { getMessageRecu, getMessageEnvoye, insertMessage, getProprietaires, getUserCulture, deconnexion } from '../assets/js/Function';
import LeftSide from '../components/LeftSide';
import UserMessage from '../components/UserMessage';
import RightSide from '../components/RightSide';
import Message from '../components/Message';

const Discussion = () => {
  const [userData, setUserData] = useState(null);
  const [cultureData, setCultureData] = useState(null);
  const [proprietaireData, setProprietaireData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    receveur: '',
    envoyeur: '',
    contenu: '',
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    document.title = 'Discussions';
    const userDataString = localStorage.getItem('userData');
    const parsedUserData = JSON.parse(userDataString);
    setUserData(parsedUserData);

    const fetchData = async () => {
      try {
        const userCultureData = await getUserCulture(parsedUserData[0].id);
        setCultureData(userCultureData);
        const allProprietaireData = await getProprietaires();
        setProprietaireData(allProprietaireData);
      } catch (error) {
        console.error('Error fetching user culture:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const receivedMessages = await getMessageRecu(selectedUser, userData[0].pseudo);
        const sentMessages = await getMessageEnvoye(userData[0].pseudo, selectedUser);

        const allMessages = [...receivedMessages, ...sentMessages];
        // Sort messages by timestamp in descending order
        allMessages.sort((a, b) => new Date(b.envoi) - new Date(a.envoi));

        setMessages(allMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (selectedUser && userData) {
      fetchMessages();
    }
  }, [selectedUser, userData]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setFormData({ ...formData, receveur: user, envoyeur: userData[0].pseudo });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('receveur', formData.receveur);
    form.append('envoyeur', formData.envoyeur);
    form.append('contenu', formData.contenu);

    const newMessage = {
      sender: formData.envoyeur,
      recipient: formData.receveur,
      content: formData.contenu,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);

    await insertMessage(form);

    setFormData({ ...formData, contenu: '' });
  };

  if (!userData) {
    return null;
  }

  return (
    <div className='page'>
      <HeaderProfil link='/accueilFront' logo="/assets/img/PNG/Logo.png" description="Logo" icon='fas fa-user-circle' pseudo={userData[0].pseudo} lien1='/ficheProfil' text1='Voir ma fiche' lien2={deconnexion} text2='Se déconnecter' />
      <main className='Landing'>
        <section className='MidLeft3'>
          <DiscussionWindow titre='Vos discussions'>
            <LeftSide text='Discussions' icon='fas fa-envelope-open-text'>
              {proprietaireData && proprietaireData.map((proprietaire) => (
                <UserMessage key={proprietaire.pseudo} icon='fas fa-user-circle' text={proprietaire.pseudo} onClick={() => handleUserClick(proprietaire.pseudo)} />
              ))}
            </LeftSide>
            <RightSide icon='fas fa-user-circle' text={selectedUser || userData[0].pseudo}>
              <main className='conv'>
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    classe={message.envoyeur === userData[0].pseudo ? 'message sent' : 'message received'}
                    text={message.contenu}
                    text2={`${message.envoyeur} - ${message.envoi}`}
                  />
                ))}
              </main>
              <div className="windowBottom">
                <form method='post' onSubmit={handleSubmit}>
                  <input type="text" name="contenu" placeholder="Votre message..." onChange={handleInputChange} value={formData.contenu} />
                  <input type="hidden" name="envoyeur" value={formData.envoyeur} />
                  <input type="hidden" name="receveur" value={formData.receveur} />
                  <button><i className="fas fa-paper-plane"></i></button>
                </form>
              </div>
            </RightSide>
          </DiscussionWindow>
        </section>
        <section className='MidRight'>
          <SideCardContainer>
            {cultureData && cultureData.map((culture) => (
              <Card key={culture.id} pic={`https://farmspring-production.up.railway.app/${culture.photo}`} desc={culture.nom} />
            ))}
          </SideCardContainer>
        </section>
      </main>
      <Footer copyright="© Tous droits réservés. Farm Game 2024"></Footer>
    </div>
  );
};

export default Discussion;