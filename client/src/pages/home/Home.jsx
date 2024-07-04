import './home.css'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Rightbar from '../../components/rightbar/Rightbar'

export default function Home() {
  return (
    <>
        <Header/>
        <div className='home'>
            <Posts />
            <Rightbar />
        </div>
    </>
  )
}
