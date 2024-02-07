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
import {getUserCulture,deconnexion,getUserParcelles} from '../assets/js/Function';

const DemandeParcelle = () => {
    const [userData, setUserData] = useState(null);
    const [parcelleData, setParcelleData] = useState(null);
    const [saisonData, setSaisonData] = useState(null);
    const [cultureData, setCultureData] = useState(null);

    const [formData, setFormData] = useState({
        parcelle: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('parcelle', e.target.parcelle.value);
        window.location.replace('/insertPlantation?parcelle='+e.target.parcelle.value);
    };

    useEffect(() => {
        document.title = 'Faire une plantation';
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
                const userParcelleData = await getUserParcelles(parsedUserData[0].id);
                setParcelleData(userParcelleData);
            } catch (error) {
                console.error('Error fetching user culture:', error);
            }
        };

        fetchData();
    }, []);

    // console.log('User Data:', userData);
    // console.log('Culture Data:', cultureData);

    if (!userData || !saisonData) {
        return null;
    }

    return (
        <div className='page'>
            <HeaderProfil link='/accueilFront' logo = "/assets/img/PNG/Logo.png" description = "Logo" icon = 'fas fa-user-circle' pseudo = {userData[0].pseudo} lien1 = '/ficheProfil' text1 = 'Voir ma fiche' lien2 = {deconnexion} text2 = 'Se déconnecter'/>
            <main className='formInsClass'>
                <section className='FormLeft'>
                    <h1>Planter sur une parcelle</h1>
                    <p className='desc2'>Dans ce menu, vous pouvez faire une plantation sur parcelle.<br/>Pour faire cela veuillez remplir les champs ci-dessous.</p>
                    <form method='post' className='Insert' id='Insert2' encType="multipart/form-data" onSubmit={handleSubmit}>
                        <p id='InsFirst'>Parcelle : 
                            <select name='parcelle' value={formData.parcelle} onChange={handleInputChange}>
                            {parcelleData && parcelleData.map((parcelle) => (
                                <option key={parcelle.idParcelle} value={parcelle.idParcelle}>{parcelle.idParcelle}</option>
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

export default DemandeParcelle;