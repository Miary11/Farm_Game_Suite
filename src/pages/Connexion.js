import React, { useEffect,useState } from 'react';
import HeaderSub from '../components/HeaderSub';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import Container from '../components/Container';
import PicContainer from '../components/PicContainer';
import Button from '../components/Button';
import {checkLogin} from '../assets/js/Function';

const Connexion = () => {
    const [formData, setFormData] = useState({
        mail: 'leTest@gmail.com',
        motDePasse: 'test',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await checkLogin(formData.mail, formData.motDePasse);
    };

    useEffect(() => {
        document.title = 'Se connecter';
    }, []);
    return (
        <div className='page'>
            <HeaderSub logo = "/assets/img/PNG/Logo.png" description = "Logo"/>
            <main className='formClass'>
                <section className='left'>
                    <h1>Se Connecter</h1>
                    <p className='desc'>Bienvenue sur Farm Game : le jeu de simulation de culture sur terrain.<br/>Sur ce site, vous êtes libre de personnaliser votre expérience à volonté en allant de créer vos cultures jusqu’à<br/>interagir avec d’autres utilisateurs.</p>
                    <Container>
                        <form method='get' className='login' onSubmit={handleSubmit}>
                            <p className='First'>Mail : <input type='mail' name='mail' value={formData.mail} onChange={handleInputChange}/></p>
                            <p>Mot de passe : <input id='pwd' type='password' name='motDePasse' value={formData.motDePasse} onChange={handleInputChange}/></p>
                            <p className='link'><a href='/inscription'>Vous n’avez pas de compte ? Inscrivez-vous en appuyant ici</a></p>
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

export default Connexion;