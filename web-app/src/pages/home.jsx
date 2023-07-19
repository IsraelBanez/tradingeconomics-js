import '../styles/home.css';
import Data from '../components/data.jsx';
import TimeSeries from '../components/time-series';
import thailand_img from '../images/thailand-img.jpg';
import sweden_img from '../images/sweden-img.png';

function Home(){
    return (
        <div className="home-container">
            <div className="header-container">
                <h1>GeoINDEX</h1>
            </div>
            
            <div className="home-img-container">
                <div className='img-container'>
                    <img src={thailand_img} alt="thailand"/>
                </div>
                <div className='img-container'>
                    <img src={sweden_img} alt="sweden"/>
                </div>
                
            </div>

            <div className="country-container">
                <div className="country">
                    <div className="country-title">
                        <h2>Thailand</h2>
                    </div>
                    <div className='dividor-container'>
                        <div className='dividor'></div>
                    </div>
                    <div className="country-data-container">
                        <Data cnty="thailand"/>
                    </div>
                    <div className='dividor-container'>
                        <div className='dividor'></div>
                    </div>
                    <div className="country-data-container">
                        <TimeSeries cnty="thailand"/>
                    </div>
                </div>
                <div className="country">
                    <div className="country-title">
                        <h2>Sweden</h2>
                    </div>
                    <div className='dividor-container'>
                        <div className='dividor'></div>
                    </div>
                    <div className="country-data-container">
                        <Data cnty="sweden"/>
                    </div>
                    <div className='dividor-container'>
                        <div className='dividor'></div>
                    </div>
                    <div className="country-data-container">
                        <TimeSeries cnty="sweden"/>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;