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

const AccueilBackOffice = () => {
    const [userData, setUserData] = useState(null);
    const [cultureData, setCultureData] = useState(null);
    const [terrainData, setTerrainData] = useState(null);

    useEffect(() => {
        document.title = 'Accueil - BackOffice';
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
            <HeaderProfil link='/accueilBack' logo = "/assets/img/PNG/Logo.png" description = "Logo" icon = 'fas fa-user-circle' pseudo = {userData[0].pseudo} lien1 = '/ficheProfil' text1 = 'Voir ma fiche' lien2 = {deconnexion} text2 = 'Se déconnecter'/>
            <main className='Landing'>
                <section className='MidLeft'>
                    <WelcomeContainer text = 'Bienvenue sur Farm Game'>
                        <p>Vous êtes actuellement dans le menu administrateur de votre partie.<br/>Ici vous pouvez créer et gérer vos différentes cultures. Vous pouvez en créer, en modifier ou encore en supprimer.<br/>Dans ce menu, vous pouvez interférer sur la validation de vos terrains, voir vos statistiques et interférer sur vos cultures.</p>
                        <section>
                            <Button link='/insertCulture' text ='Ajouter une culture'/>
                            <Button link='/validerTerrain' text ='Valider un terrain'/>
                            <Button link='/stats' text ='Voir les statistiques'/>
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

export default AccueilBackOffice;