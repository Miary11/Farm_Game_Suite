import React, { useEffect,useState } from 'react';
import HeaderSub from '../components/HeaderSub';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import Container from '../components/Container';
import PicContainer from '../components/PicContainer';
import Button from '../components/Button';
import {insertUser} from '../assets/js/Function';

const Inscription = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        naissance: '',
        mail: '',
        mdp: '',
        pseudo: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await insertUser(formData.nom, formData.prenom, formData.naissance, formData.mail, formData.mdp, formData.pseudo);
    };

    useEffect(() => {
        document.title = 'S\'inscrire';
    }, []);
    return (
        <div className='page'>
            <HeaderSub logo = "/assets/img/PNG/Logo.png" description = "Logo"/>
            <main className='formClass'>
                <section className='left'>
                    <h1>S’inscrire</h1>
                    <p className='desc'>Bienvenue sur Farm Game : le jeu de simulation de culture sur terrain.<br/>Inscrivez vous en remplissant les champs ci-dessous.</p>
                    <Container id="inscr">
                        <form method='post' className='login' onSubmit={handleSubmit}>
                            <p id='First'>Nom : <input type='text' name='nom' value={formData.nom} onChange={handleInputChange}/></p>
                            <p>Prénom : <input id='pr' type='text' name='prenom' value={formData.prenom} onChange={handleInputChange}/></p>
                            <p>Date de naissance : <input id='dN' type='date' name='naissance' value={formData.naissance} onChange={handleInputChange}/></p>
                            <p>Mail : <input id='ma' type='mail' name='mail' value={formData.mail} onChange={handleInputChange}/></p>
                            <p>Mot de passe : <input id='mdp' type='password' name='mdp' value={formData.mdp} onChange={handleInputChange}/></p>
                            <p>Pseudo : <input id='ps' type='text' name='pseudo' value={formData.pseudo} onChange={handleInputChange}/></p>
                            <Button text = 'Valider'></Button>
                        </form>
                    </Container>
                </section>
                <section className='right' id='picRight'>
                    <PicContainer image = '/assets/img/JPG/charmaine-jane-villanueva-asset.jpeg' description = 'game'/>
                </section>
            </main>
            <Footer copyright = "© Tous droits réservés. Farm Game 2024"></Footer>
        </div>
    );
};

export default Inscription;