import React, { useEffect,useState } from 'react';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import HeaderProfil from '../components/HeaderProfil';
import '../assets/fontawesome-5/css/all.css';
import Container from '../components/Container';
import {getUserNbCulture,getUserNbTerrain,getUserNbParcelleMoyen,getUserSurfaceMoyenne,getUserNbSimulation,getUserRendement,deconnexion} from '../assets/js/Function';

const Statistiques = () => {
    const [userData, setUserData] = useState(null);
    const [culturesData, setNbCulturesData] = useState(null);
    const [nbterrainsData, setNbTerrainsData] = useState(null);
    const [nbparcelleData, setNbParcelleData] = useState(null);
    const [surfaceData, setSurfaceData] = useState(null);
    const [nbsimulationData, setNbSimulationData] = useState(null);
    const [rendementData, setRendementData] = useState(null);

    useEffect(() => {
        document.title = 'Statistiques';
        const userDataString = localStorage.getItem('userData');
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);

        const fetchData = async () => {
            try {
                const nbCulturesData = await getUserNbCulture(parsedUserData[0].id);
                setNbCulturesData(nbCulturesData);
                const nbTerrainsData = await getUserNbTerrain(parsedUserData[0].id);
                setNbTerrainsData(nbTerrainsData);
                const nbParcelleData = await getUserNbParcelleMoyen(parsedUserData[0].id);
                setNbParcelleData(nbParcelleData);
                const parsedsurfacedata = await getUserSurfaceMoyenne(parsedUserData[0].id);
                setSurfaceData(parsedsurfacedata);
                const nbSimulationData = await getUserNbSimulation(parsedUserData[0].id);
                setNbSimulationData(nbSimulationData);
                const rendementdata = await getUserRendement(parsedUserData[0].id);
                setRendementData(rendementdata);
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
            <main className='noGridMain'>
                <h1>Statistiques</h1>
                <p>Dans ce menu, vous pouvez voir les statistiques reliées à votre profil.</p>
                <Container id = 'statsContainer'>
                    <Container id = 'statsLeft'>
                        <p>Cultures</p>
                        {culturesData && culturesData.map((culture) => (
                            <h1>{culture.cultures}</h1>
                        ))}
                    </Container>
                    <section className='MidLeft'>
                        <Container id = 'statsMidLeftTop'>
                            <p>Terrains</p>
                            {nbterrainsData && nbterrainsData.map((terrain) => (
                                <h1>{terrain.terrains}</h1>
                            ))}
                        </Container>
                        <Container id = 'statsMidLeftBottom'>
                            <p>Nombre moyen de parcelles / Terrain </p>
                            {nbparcelleData && nbparcelleData.map((parcelle) => (
                                <h1>{parcelle.parcelles}</h1>
                            ))}
                        </Container>
                    </section>
                    <Container id = 'MidRight'>
                        <p>Surface de parcelle<br/>moyenne (en mètre carré)</p>
                        {surfaceData && surfaceData.map((surface) => (
                            <h1>{surface.surface}</h1>
                        ))}
                    </Container>
                    <section className='statsRight'>
                        <Container id = 'statsRightTop'>
                            <p>Simulations</p>
                            {nbsimulationData && nbsimulationData.map((simulation) => (
                                <h1>{simulation.simulation}</h1>
                            ))}
                        </Container>
                        <Container id = 'statsRightBottom'>
                            <p>Rendement moyen (%)</p>
                            {rendementData && rendementData.map((rendement) => (
                                <h1>{rendement.rendement}</h1>
                            ))}
                        </Container>
                    </section>
                </Container>
            </main>
            <Footer copyright = "© Tous droits réservés. Farm Game 2024"></Footer>
        </div>
    );
};

export default Statistiques;