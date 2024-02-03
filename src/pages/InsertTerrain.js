import React, { useEffect,useState } from 'react';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import Button from '../components/Button';
import HeaderProfil from '../components/HeaderProfil';
import '../assets/fontawesome-5/css/all.css';
import SideCardContainer from '../components/SideCardContainer';
import Card from '../components/Card';
import CardDetails from '../components/CardDetails';
import SmallSideContainer from '../components/SmallSideContainer';
import {insertTerrain,getUserCulture,deconnexion} from '../assets/js/Function';

const InsertTerrain = () => {
    const [userData, setUserData] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const [saisonData, setSaisonData] = useState(null);
    const [cultureData, setCultureData] = useState(null);

    const [formData, setFormData] = useState({
        user: '',
        description: '',
        localisation: '',
        photo: '',
        creation: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('user', e.target.user.value);
        form.append('description', e.target.description.value);
        form.append('localisation', e.target.localisation.value);
        form.append('photo', e.target.photo.files[0]);
        form.append('creation', e.target.creation.value);
        await insertTerrain(form);
    };

    useEffect(() => {
        document.title = 'Insérer un terrain';
        const userDataString = localStorage.getItem('userData');
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
        const typeDataString = localStorage.getItem('typeData');
        const parsedTypeData = JSON.parse(typeDataString);
        setTypeData(parsedTypeData);
        const saisonDataString = localStorage.getItem('saisonData');
        const parsedSaisonData = JSON.parse(saisonDataString);
        setSaisonData(parsedSaisonData);

        const fetchData = async () => {
            try {
                const userCultureData = await getUserCulture(parsedUserData[0].id);
                setCultureData(userCultureData);
            } catch (error) {
                console.error('Error fetching user culture:', error);
            }
        };

        fetchData();
    }, []);

    // console.log('User Data:', userData);
    // console.log('Culture Data:', cultureData);

    if (!userData || !typeData || !saisonData) {
        return null;
    }

    return (
        <div className='page'>
            <HeaderProfil link='/accueilBack' logo = "/assets/img/PNG/Logo.png" description = "Logo" icon = 'fas fa-user-circle' pseudo = {userData[0].pseudo} lien1 = '/ficheProfil' text1 = 'Voir ma fiche' lien2 = {deconnexion} text2 = 'Se déconnecter'/>
            <main className='formInsClass'>
                <section className='FormLeft'>
                    <h1>Insérer un terrain</h1>
                    <p className='desc2'>Dans ce menu, vous pouvez créer une culture qui vous sera propre et qui sera uniquement visible sur votre profil.<br/>Pour faire cela veuillez remplir les champs ci-dessous.</p>
                    <form method='post' className='Insert' encType="multipart/form-data" onSubmit={handleSubmit}>
                        <p id='InsFirst'>Description : <input type = 'text' name='description' value={formData.description} onChange={handleInputChange}/></p>
                        <p>Localisation : <input type = 'text' name='localisation' value={formData.localisation} onChange={handleInputChange}/></p>
                        <p>Sélectionner une photo : <input type ='file' name = 'photo' onChange={handleInputChange}/></p>
                        <p>Date de création : <input type = 'date' name='creation' value={formData.creation} onChange={handleInputChange}/></p>
                        <input type='hidden' name='user' value={userData[0].id}/>
                        <Button text = 'Valider'/>
                    </form>
                </section>
                <section className='SideLeft'>
                    <SideCardContainer>
                    {cultureData && cultureData.map((culture) => (
                        <Card key={culture.id} pic={`https://farmspring-production.up.railway.app/${culture.photo}`} desc={culture.nom}/>
                    ))}
                    </SideCardContainer>
                </section>
                <section className='SideRight'>
                    <SmallSideContainer titre = 'Saisons'>
                        <CardDetails pic = "/assets/img/JPG/Winter.jpeg" text1 = {saisonData[0].debut} text2 = {saisonData[0].fin}/>
                        <CardDetails pic = "/assets/img/JPG/Spring.jpeg" text1 = {saisonData[1].debut} text2 = {saisonData[1].fin}/>
                        <CardDetails pic = "/assets/img/JPG/Summer.jpeg" text1 = {saisonData[2].debut} text2 = {saisonData[2].fin}/>
                        <CardDetails pic = "/assets/img/JPG/Fall.jpeg" text1 = {saisonData[3].debut} text2 = {saisonData[3].fin}/>
                    </SmallSideContainer>
                </section>
            </main>
            <Footer copyright = "© Tous droits réservés. Farm Game 2024"></Footer>
        </div>
    );
};

export default InsertTerrain;