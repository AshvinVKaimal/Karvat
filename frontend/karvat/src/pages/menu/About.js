import React from 'react';
import '../../App.css';

const About = () => {
    return (
        <React.StrictMode>
            <div className='bg-krvt_cream h-full min-h-screen'>

                {/* About text */}
                <div className='max-w-full mx-auto'>
                    <h1 className='flex'></h1>
                    <h1 className='flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center'>About</h1>
                    <p className='text-krvt_moss font-body text-xl m-5'>Indian markets do really provide some authentic and fantastic products at the best prices, whether it be clothing, spices, or jewelry. Numerous markets from diverse ages are still active today. The finest clothing, accessories, handicrafts, jewelry, and many other items have been offered for sale at these locations.</p>
                    <p className='text-krvt_moss font-body text-xl text-right m-5'><span className='font-karvat text-krvt_ochre'>Karvat</span> aims to introduce these regional markets on our website so that everyone can access them. Our goal is to take these shop owners and vendors and make their goods visible to the public and always accessible, while users are able to digitally shop and experience these markets.</p>
                </div>

                {/* Our Founders */}
                <div className='max-w-full mx-auto'>
                    <h1 className='flex text-krvt_brick font-karvat text-4xl mt-5 justify-center text-center'>Our Founders</h1>
                    <p className='text-krvt_moss font-body text-xl m-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tellus dapibus, interdum turpis ac, ultricies ex. Nulla vestibulum est vitae urna mollis, sed tempor ipsum laoreet. Aenean nisi lacus, malesuada a nisl in, ullamcorper ultrices nisl. Duis molestie sapien sed malesuada pharetra. Vivamus nec dolor nibh. Ut ac faucibus velit. Aenean non vehicula felis, sit amet interdum nulla. Maecenas venenatis dolor et justo consequat interdum eleifend in justo. Pellentesque sit amet lectus at augue suscipit dignissim. Praesent viverra mattis metus quis imperdiet. Fusce efficitur ac tellus non ultrices.</p>
                    <p className='text-krvt_moss font-body text-xl text-right m-5'>Curabitur molestie leo eget risus ullamcorper aliquam. Nulla venenatis metus eu elit suscipit, sed ultrices nunc varius. Etiam facilisis leo vehicula, pulvinar nibh id, aliquet odio. Aliquam vitae convallis lorem. Sed nec pretium nunc. Nam non vulputate ipsum. Cras magna libero, pellentesque eget neque quis, maximus tempus sem. Donec facilisis odio id mattis tempus. Fusce enim elit, faucibus id aliquet at, dapibus id leo. Praesent a massa quis metus pretium lobortis. Sed euismod felis at iaculis sodales. Sed consequat ligula vel ligula aliquam, ac tincidunt orci vulputate. Proin molestie odio et dui viverra, ut placerat orci vehicula. Vestibulum vehicula mauris ligula, sed congue tellus venenatis vel. Nunc facilisis nulla sit amet orci eleifend, ut accumsan neque placerat.</p>
                </div>
                <br></br>
            </div>
        </React.StrictMode>
    )
}

export default About;