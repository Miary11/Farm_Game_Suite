import React, { useEffect,useState } from 'react';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import HeaderProfil from '../components/HeaderProfil';
import '../assets/fontawesome-5/css/all.css';
import SideCardContainer from '../components/SideCardContainer';
import Card from '../components/Card';
import {getUserSimulation,getUserCulture,deconnexion} from '../assets/js/Function';

const Historique = () => {
    const [userData, setUserData] = useState(null);
    const [simulationData, setSimulationData] = useState(null);
    const [cultureData, setCultureData] = useState(null);

    useEffect(() => {
        document.title = 'Historique des simulations';
        const userDataString = localStorage.getItem('userData');
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);

        const fetchData = async () => {
            try {
                const userSimulationData = await getUserSimulation(parsedUserData[0].id);
                setSimulationData(userSimulationData);
                const userCultureData = await getUserCulture(parsedUserData[0].id);
                setCultureData(userCultureData);
            } catch (error) {
                console.error('Error fetching user culture:', error);
            }
        };

        fetchData();
    }, []);

    // console.log('User Data:', userData);

    if (!userData) {
        return null;
    }
    
    return (
        <div className='page'>
            <HeaderProfil link='/accueilFront' logo = "/assets/img/PNG/Logo.png" description = "Logo" icon = 'fas fa-user-circle' pseudo = {userData[0].pseudo} lien1 = '/ficheProfil' text1 = 'Voir ma fiche' lien2 = {deconnexion} text2 = 'Se déconnecter'/>
            <main className='Landing'>
                <section className='MidLeft2'>
                    <h1 className='title2'>Historique des simulations</h1>
                    <p className='desc2'>
                        Voici l'historique de vos simulations.
                    </p>
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Culture</th>
                            <th>Parcelle</th>
                            <th>Quantité</th>
                        </tr>
                        {simulationData && simulationData.map((simulation) => (
                            <tr key={simulation.id}>
                                <td>{simulation.date}</td>
                                <td>{simulation.culture}</td>
                                <td>{simulation.parcelle}</td>
                                <td>{simulation.quantite}</td>
                            </tr>
                        ))}
                    </table>
                </section>
                <section className='MidRight'>
                    <SideCardContainer>
                    {cultureData && cultureData.map((culture) => (
                        <Card key={culture.id} pic={`https://farmspring-production.up.railway.app/${culture.photo}`} desc={culture.nom}/>
                    ))}
                    </SideCardContainer>
                </section>
            </main>
            <Footer copyright = "© Tous droits réservés. Farm Game 2024"></Footer>
        </div>
    );
};

export default Historique;