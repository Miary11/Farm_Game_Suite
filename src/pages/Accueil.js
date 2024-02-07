import React, { useEffect, useState } from 'react';
import '../assets/css/style.css';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Header from '../components/Header';
import '../assets/fontawesome-5/css/all.css';
import {getCultures,getAllType,getProprietaires,getParcelles,getParcellesCultures} from '../assets/js/Function';

const Accueil = () => {
    const [cultureData, setCultureData] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const [proprietaireData, setProprietaireData] = useState(null);
    const [parcelleData, setParcelleData] = useState(null);
    const [parcelleCultureData, setParcelleCultureData] = useState(null);
    const [filteredCultureData, setFilteredCultureData] = useState(null);
    const [filteredParcelleCultureData, setFilteredParcelleCultureData] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({
        selectedParcelle: 'Tous',
        selectedType: 'Tous',
        selectedProprietaire: 'Tous',
    });

    useEffect(() => {
        document.title = 'Accueil';
        const fetchData = async () => {
            try {
                const allCultureData = await getCultures();
                setCultureData(allCultureData);
                const allTypeData = await getAllType();
                setTypeData(allTypeData);
                const allProprietaireData = await getProprietaires();
                setProprietaireData(allProprietaireData);
                const allParcelleData = await getParcelles();
                setParcelleData(allParcelleData);
                const allParcelleCultureData = await getParcellesCultures();
                setParcelleCultureData(allParcelleCultureData);
                setFilteredCultureData(allCultureData);
                setFilteredParcelleCultureData(allParcelleCultureData);
            } catch (error) {
                console.error('Error fetching all culture:', error);
            }
        };

        fetchData();
    }, []);

    const filterData = (criteria) => {
        const { selectedParcelle, selectedType, selectedProprietaire } = criteria;

        const isAllSelected =
            selectedParcelle === 'Tous' &&
            selectedType === 'Tous' &&
            selectedProprietaire === 'Tous';

        const filteredCultureData = isAllSelected
            ? cultureData
            : cultureData.filter((item) => {
                  const typeMatch =
                      selectedType === 'Tous' || item.type === selectedType;
                  return (
                      typeMatch &&
                      (selectedParcelle === 'Tous' ||
                          item.idParcelle === selectedParcelle) &&
                      (selectedProprietaire === 'Tous' ||
                          item.proprietaire === selectedProprietaire)
                  );
              });

        const filteredParcelleCultureData = isAllSelected
            ? parcelleCultureData
            : parcelleCultureData.filter((item) => {
                  const typeMatch =
                      selectedType === 'Tous' || item.type === selectedType;
                  return (
                      typeMatch &&
                      (selectedParcelle === 'Tous' ||
                          item.idParcelle === selectedParcelle) &&
                      (selectedProprietaire === 'Tous' ||
                          item.proprietaire === selectedProprietaire)
                  );
              });

        setFilteredCultureData(filteredCultureData);
        setFilteredParcelleCultureData(filteredParcelleCultureData);
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        filterData(filterCriteria);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };

    return (
        <div className='page'>
            <Header
                logo='/assets/img/PNG/Logo.png'
                lien='/connexion'
                text2='Se connecter'
            />
            <main className='Landing'>
                <section className='MidLeft2'>
                    <h1 className='title2'>Liste des cultures</h1>
                    <p className='desc2'>
                        Voici la liste des cultures avec leurs propriétaires.
                    </p>
                    <table>
                        <tr>
                            <th>Culture</th>
                            <th>Type</th>
                            <th>Saison</th>
                            <th>Prix d'achat(en Ar)</th>
                            <th>Prix de vente(en Ar)</th>
                            <th>Propriétaire</th>
                        </tr>
                        {filteredCultureData &&
                            filteredCultureData.map((culture) => (
                                <tr key={culture.idCulture}>
                                    <td>{culture.nom}</td>
                                    <td>{culture.type}</td>
                                    <td>{culture.saison}</td>
                                    <td>{culture.prixAchat}</td>
                                    <td>{culture.prixVente}</td>
                                    <td>{culture.proprietaire}</td>
                                </tr>
                            ))}
                    </table>
                    <h1 className='title2'>
                        Liste des cultures sur parcelle
                    </h1>
                    <p className='desc2'>
                        Voici la liste des cultures sur parcelle avec leurs
                        propriétaires.
                    </p>
                    <table>
                        <tr>
                            <th>Terrain</th>
                            <th>Parcelle</th>
                            <th>Culture</th>
                            <th>Type</th>
                            <th>Quantité(en kg)</th>
                            <th>Date de plantation</th>
                            <th>Propriétaire</th>
                        </tr>
                        {filteredParcelleCultureData &&
                            filteredParcelleCultureData.map(
                                (parcelleCulture) => (
                                    <tr
                                        key={parcelleCulture.culture}
                                    >
                                        <td>{parcelleCulture.terrain}</td>
                                        <td>{parcelleCulture.idParcelle}</td>
                                        <td>{parcelleCulture.culture}</td>
                                        <td>{parcelleCulture.type}</td>
                                        <td>{parcelleCulture.quantite}</td>
                                        <td>{parcelleCulture.date}</td>
                                        <td>
                                            {parcelleCulture.proprietaire}
                                        </td>
                                    </tr>
                                )
                            )}
                    </table>
                </section>
                <section className='MidRight2'>
                    <aside>
                        <form method='get' onSubmit={handleFilterSubmit}>
                            <h1>Filtrer par :</h1>
                            <p>
                                Parcelle :{' '}
                                <select
                                    name='selectedParcelle'
                                    id='p1'
                                    onChange={handleFilterChange}
                                    value={filterCriteria.selectedParcelle}
                                >
                                    <option value='Tous'>Tous</option>
                                    {parcelleData &&
                                        parcelleData.map((parcelle) => (
                                            <option
                                                key={parcelle.idParcelle}
                                                value={parcelle.idParcelle}
                                            >
                                                {parcelle.idParcelle}
                                            </option>
                                        ))}
                                </select>
                            </p>
                            <p>
                                Culture :{' '}
                                <select
                                    name='selectedType'
                                    id='p2'
                                    onChange={handleFilterChange}
                                    value={filterCriteria.selectedType}
                                >
                                    <option value='Tous'>Tous</option>
                                    {typeData &&
                                        typeData.map((type) => (
                                            <option
                                                key={type.idType}
                                                value={type.nom}
                                            >
                                                {type.nom}
                                            </option>
                                        ))}
                                </select>
                            </p>
                            <p>
                                Propriétaire :{' '}
                                <select
                                    name='selectedProprietaire'
                                    id='p3'
                                    onChange={handleFilterChange}
                                    value={
                                        filterCriteria.selectedProprietaire
                                    }
                                >
                                    <option value='Tous'>Tous</option>
                                    {proprietaireData &&
                                        proprietaireData.map(
                                            (proprietaire) => (
                                                <option
                                                    key={
                                                        proprietaire.pseudo
                                                    }
                                                    value={
                                                        proprietaire.pseudo
                                                    }
                                                >
                                                    {proprietaire.pseudo}
                                                </option>
                                            )
                                        )}
                                </select>
                            </p>
                            <Button text='Valider' />
                        </form>
                    </aside>
                </section>
            </main>
            <Footer copyright='© Tous droits réservés. Farm Game 2024' />
        </div>
    );
};

export default Accueil;