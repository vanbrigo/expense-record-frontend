import './AvatarPicker.css'
import { Container } from 'react-bootstrap'

export const AvatarPicker=()=>{
    const avatars=["https://img.icons8.com/external-doodles-line-amoghdesign/100/1A1A1A/external-avatar-winter-sport-doodles-doodles-line-amoghdesign.png",
    "https://img.icons8.com/external-line-zulfa-mahendra/100/1A1A1A/external-avatar-halloween-line-zulfa-mahendra-2.png",
    "https://img.icons8.com/external-outline-wichaiwi/100/1A1A1A/external-avatar-jobs-and-occupations-outline-wichaiwi-19.png",
    "https://img.icons8.com/external-outline-wichaiwi/100/1A1A1A/external-avatar-jobs-and-occupations-outline-wichaiwi-50.png",
    "https://img.icons8.com/external-others-cattaleeya-thongsriphong/100/1A1A1A/external-avatar-female-avatar-outline-others-cattaleeya-thongsriphong-18.png",
    "https://img.icons8.com/external-line-rakhmat-setiawan/100/1A1A1A/external-avatar-winter-line-line-rakhmat-setiawan.png",
    "https://img.icons8.com/external-outline-icons-mangsaabguru-/100/1A1A1A/external-avatar-halloweens-day-outline-outline-icons-mangsaabguru--3.png",
    "https://img.icons8.com/external-outline-berkahicon/100/1A1A1A/external-avatar-cyberpunk-outline-berkahicon.png" ,
    "https://img.icons8.com/external-outline-icons-mangsaabguru-/100/1A1A1A/external-african-avatar-outline-outline-icons-mangsaabguru--2.png"
]
    return(
    <Container fluid className='avatarPickerDesign'>
        <div className='avatarPicker'>
        {avatars.map((avatar,index)=>{
            return(<div className='avatarPickerBox'>
            <img key={index} src={avatar} alt={`Imagen ${index + 1}`} />
            </div>)
        })}
        </div>
    </Container>
    )
}