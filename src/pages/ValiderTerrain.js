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
import {validerTerrain,getUserTerrainNonValide,getUserCulture,deconnexion} from '../assets/js/Function';

const ValiderTerrain = () => {
    const [userData, setUserData] = useState(null);
    const [saisonData, setSaisonData] = useState(null);
    const [cultureData, setCultureData] = useState(null);
    const [terrainData, setTerrainData] = useState(null);

    const [formData, setFormData] = useState({
        terrain: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('terrain', e.target.terrain.value);
        await validerTerrain(form);
    };

    useEffect(() => {
        document.title = 'Valider un terrain';
        const userDataString = localStorage.getItem('userData');
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
        const saisonDataString = localStorage.getItem('saisonData');
        const parsedSaisonData = JSON.parse(saisonDataString);
        setSaisonData(parsedSaisonData);

        const fetchData = async () => {
            try {
                const userCultureData = await getUserCulture(parsedUserData[0].id);
                setCultureData(userCultureData);
                const userTerrainData = await getUserTerrainNonValide(parsedUserData[0].id);
                setTerrainData(userTerrainData);
            } catch (error) {
                console.error('Error fetching user culture:', error);
            }
        };

        fetchData();
    }, []);

    console.log('User Data:', userData);

    if (!userData || !saisonData) {
        return null;
    }
    
    return (
        <div className='page'>
            <HeaderProfil link='/accueilBack' logo = "/assets/img/PNG/Logo.png" description = "Logo" icon = 'fas fa-user-circle' pseudo = {userData[0].pseudo} lien1 = '/ficheProfil' text1 = 'Voir ma fiche' lien2 = {deconnexion} text2 = 'Se déconnecter'/>
            <main className='formInsClass'>
                <section className='FormLeft'>
                    <h1>Valider un terrain</h1>
                    <p className='desc2'>Dans ce menu, vous pouvez valider un terrain qui a été créé par vos soins.<br/>Pour faire cela veuillez remplir les champs ci-dessous.</p>
                    <form method='put' className='Insert' onSubmit={handleSubmit}>
                        <p className='tFirst'>Terrain : 
                            <select name='terrain' value={formData.terrain} onChange={handleInputChange}>
                            {terrainData && terrainData.map((terrain) => (
                                <option key={terrain.idTerrain} value={terrain.idTerrain}>{terrain.localisation}</option>
                            ))}
                            </select>
                        </p>
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

export default ValiderTerrain;