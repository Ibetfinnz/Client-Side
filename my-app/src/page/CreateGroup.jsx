import './CreateGroup.css'
import Navbar from "../components/navbar"
import CreateGroupForm from "../components/CreateGroupForm"
import Footer from '../components/Footer'

export default function CreateGroup(){
    return (
        <>
            <Navbar />
            <main>
                <h1 className="page-title">สร้างกลุ่มอ่านหนังสือ</h1>
                <CreateGroupForm />
            </main>
            <Footer />
        </>
    )
}