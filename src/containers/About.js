import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import House from '../assets/images/house.jpg';

const About = () => {
    const [topSeller, setTopSeller] = useState([]);
    const [realtors, setRealtors] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const getTopSeller = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/realtors/topseller`, config);
                setTopSeller(res.data);
            }
            catch (err) {

            }
        };

        getTopSeller();
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const getRealtors = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/realtors/`, config);
                setRealtors(res.data);
            }
            catch (err) {

            }
        };

        getRealtors();
    }, []);

    const getAllRealtors = () => {
        let allRealtors = [];
        let results = [];

        realtors.map(realtor => {
            return allRealtors.push(
                <Fragment key={realtor.id}>
                    <div className='about__display'>
                        <img className='about__display__image' src={realtor.photo} alt='' />
                    </div>
                    <h3 className='about__realtor'>{realtor.name}</h3>
                    <p className='about__contact'>{realtor.phone}</p>
                    <p className='about__contact'>{realtor.email}</p>
                    <p className='about__about'>{realtor.description}</p>
                </Fragment>
            );
        });

        for (let i = 0; i < realtors.length; i += 3) {
            results.push(
                <div key={i} className='row'>
                    <div className='col-1-of-3'>
                        {allRealtors[i]}
                    </div>
                    <div className='col-1-of-3'>
                        {allRealtors[i+1] ? allRealtors[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                        {allRealtors[i+2] ? allRealtors[i+2] : null}
                    </div>
                </div>
            );
        }

        return results;
    };  

    const getTopSeller = () => {
        let result = [];

        topSeller.map(seller => {
            return result.push(
                <Fragment key={seller.id}>
                    <div className='about__display'>
                        <img className='about__display__image' src={seller.photo} alt='' />
                    </div>
                    <h3 className='about__topseller'>Top Seller:</h3>
                    <p className='about__realtor'>{seller.name}</p>
                    <p className='about__contact'>{seller.phone}</p>
                    <p className='about__contact'>{seller.email}</p>
                    <p className='about__about'>{seller.description}</p>
                </Fragment>
            );
        });

        return result;
    };

    return (
        <main className='about'>
            <Helmet>
                <title>Biuro Obrotu Nieruchomościami Bratki</title>
                <meta
                    name='description'
                    content='About us'
                />
            </Helmet>
            <header className='about__header'>
                <h1 className='about__heading'>O nas</h1>
            </header>
            <section className='about__info'>
                <div className='row'>
                    <div className='col-3-of-4'>
                        <h2 className='about__subheading'>Witajcie!</h2>
                        <p className='about__paragraph'>
                        Jesteśmy profesjonalnym biurem obrotu nieruchomościami, które z pasją i zaangażowaniem pomaga klientom w realizacji ich marzeń o idealnym domu lub inwestycji. Nasza firma powstała z przekonaniem, że każda nieruchomość ma swoją niepowtarzalną historię i potencjał, który warto odkryć. <br></br><br></br>
                        Działamy na rynku nieruchomości, zdobywając zaufanie naszych klientów poprzez transparentność, uczciwość i indywidualne podejście. Nasza ekipa doświadczonych agentów nieruchomości doskonale zna lokalny rynek i jest gotowa sprostać nawet najbardziej wymagającym oczekiwaniom.
                        </p>    
                        <div className='about__display'>
                            <img className='about__display__image' src={House} alt='' />
                        </div>
                        <p className='about__paragraph'>
                        Naszym celem jest nie tylko znalezienie idealnej nieruchomości dla naszych klientów, ale także stworzenie trwałej relacji opartej na wzajemnym zaufaniu. Dlatego każde zlecenie traktujemy indywidualnie, starając się zrozumieć unikalne potrzeby i cele każdego klienta. <br></br><br></br>
                        Nieustannie rozwijamy nasze umiejętności i śledzimy najnowsze trendy na rynku nieruchomości, aby być na bieżąco z najnowszymi możliwościami i innowacjami. Nasza misja to nie tylko sprzedaż nieruchomości, ale także wspieranie naszych klientów na każdym etapie transakcji. <br></br><br></br>
                        Jeśli szukasz partnera, który pomoże Ci zrealizować marzenia związane z nieruchomościami, to jesteśmy do Twojej dyspozycji. Z nami znajdziesz nie tylko dom, ale również miejsce, gdzie poczujesz się jak w domu. <br></br><br></br>
                        Dołącz do grona naszych zadowolonych klientów i razem odkrywajmy fascynujący świat nieruchomości!
                        </p>
                    </div>
                    <div className='col-1-of-4'>
                        {getTopSeller()}
                    </div>
                </div>
            </section>
            <section className='about__team'>
                <div className='row'>
                    <h2 className='about__subheading'>
                        Serdecznie zapraszamy,<br></br>
                        Zespół Biura Obrotu Nieruchomościami Bratki</h2>
                </div>
                {getAllRealtors()}
            </section>
        </main>
    );
};

export default About;
