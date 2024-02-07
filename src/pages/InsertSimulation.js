import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import Button from '../components/Button';
import HeaderProfil from '../components/HeaderProfil';
import '../assets/fontawesome-5/css/all.css';
import SideCardContainer from '../components/SideCardContainer';
import Card from '../components/Card';
import CardDetails from '../components/CardDetails';
import SmallSideContainer from '../components/SmallSideContainer';
import {insertSimulation,getUserCulture,getUserParcelleCultures,deconnexion} from '../assets/js/Function';

const InsertSimulation = () => {
    const [userData, setUserData] = useState(null);
    const [saisonData, setSaisonData] = useState(null);
    const [cultureData, setCultureData] = useState(null);
    const [culturePossibleData, setCulturePossibleData] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const parcelleValue = searchParams.get('parcelle');

    const [formData, setFormData] = useState({
        parcelle: '',
        culture: '',
        quantite: '',
        date: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('parcelle', e.target.parcelle.value);
        form.append('culture', e.target.culture.value);
        form.append('quantite', e.target.quantite.value);
        form.append('date', e.target.date.value);

        await insertSimulation(form);
    };

    useEffect(() => {
        document.title = 'Insérer une simulation';
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
                const userCulturePossibleData = await getUserParcelleCultures(parsedUserData[0].id,parcelleValue);
                setCulturePossibleData(userCulturePossibleData);
            } catch (error) {
                console.error('Error fetching user culture:', error);
            }
        };

        fetchData();
    }, [parcelleValue]);

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
                    <h1>Insérer une simulation</h1>
                    <p className='desc2'>Dans ce menu, vous pouvez faire votre simulation.<br/>Pour faire cela veuillez remplir les champs ci-dessous.</p>
                    <form method='post' className='Insert' encType="multipart/form-data" onSubmit={handleSubmit}>
                        <p id='InsFirst2'>Culture : 
                            <select id='cul' name='culture' value={formData.culture} onChange={handleInputChange}>
                            {culturePossibleData && culturePossibleData.map((culture) => (
                                <option key={culture.type} value={culture.type}>{culture.culture}</option>
                            ))}
                            </select>
                        </p>
                        <p>Quantité : <input id='pA' type='number' name='quantite' value={formData.quantite} onChange={handleInputChange}/></p>
                        <p>Date de culture : <input id='dN' type='date' name='date' value={formData.date} onChange={handleInputChange}/></p>
                        <input type='hidden' name='parcelle' value={parcelleValue}/>
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

export default InsertSimulation;