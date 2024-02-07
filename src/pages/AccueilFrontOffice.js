import React, { useEffect,useState } from 'react';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import Button from '../components/Button';
import HeaderProfil from '../components/HeaderProfil';
import '../assets/fontawesome-5/css/all.css';
import WelcomeContainer from '../components/WelcomeContainer';
import SideCardContainer from '../components/SideCardContainer';
import Card from '../components/Card';
import CardDetails from '../components/CardDetails';
import {getUserFirstTerrain,getUserCulture,deconnexion} from '../assets/js/Function';

const AccueilFrontOffice = () => {
    const [userData, setUserData] = useState(null);
    const [cultureData, setCultureData] = useState(null);
    const [terrainData, setTerrainData] = useState(null);

    useEffect(() => {
        document.title = 'Accueil - FrontOffice';
        const userDataString = localStorage.getItem('userData');
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);

        const fetchData = async () => {
            try {
                const userCultureData = await getUserCulture(parsedUserData[0].id);
                setCultureData(userCultureData);
                const userTerrainData = await getUserFirstTerrain(parsedUserData[0].id);
                setTerrainData(userTerrainData);
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
                <section className='MidLeft'>
                    <WelcomeContainer text = 'Bienvenue sur Farm Game'>
                        <p>Vous êtes actuellement dans le menu utilisateur de votre partie.<br/>Ici vous pouvez faire une simulation, faire une culture sur parcelle, voir l'historique de vos simulations et interagir avec d'autres utilisateurs.<br/>Pour exécuter ces actions, il vous suffit d'appuyer sur l'un des boutons ci-dessous.</p>
                        <section>
                            <Button link='/demandeSimulation' text ='Faire une simulation'/>
                            <Button link='/demandeParcelle' text ='Faire une culture'/>
                            <Button link='/historique' text ='Voir votre historique'/>
                            <Button link='/discussion' text ='Voir vos discussions'/>
                        </section>
                    </WelcomeContainer>
                    <section className='BottomLeft'>
                        {terrainData && terrainData.map((terrain) => (
                            <CardDetails key={terrain.idTerrain} pic={`https://farmspring-production.up.railway.app/${terrain.photo}`} description = {terrain.localisation} text1={`Localisation: ${terrain.localisation}`} text2={`Etat : ${terrain.etat === 0 ? 'Non validé' : terrain.etat === 1 ? 'Validé' : terrain.etat}`}/>
                        ))}
                    </section>
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

export default AccueilFrontOffice;