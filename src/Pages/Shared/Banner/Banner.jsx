import './Banner.css'
import banner from '../../../assets/images/bg.jpg'
import { Parallax } from 'react-parallax';

const Banner = () => {
    return (
        <Parallax blur={10} bgImageAlt="banner" strength={300}>
        <div className='h-[650px] bannerBg bg-fixed text-white flex justify-center items-center'>
            <div className='text-center space-y-4'>
                <h1 className='text-7xl font-bold'>Track Your Time</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />Quibusdam optio iste numquam iusto tempora veritatis tempore nisi facere eos magnam?</p>
                <h2 class="getBtn"><span>Get Started</span><em></em></h2>
            </div>
        </div>
        </Parallax>
        
    );
};

export default Banner;