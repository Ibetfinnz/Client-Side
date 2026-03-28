import './CreateGroup.css'
import Navbar from "../components/Navbar"
import CreateGroupForm from "../components/CreateGroupForm"
import Footer from '../components/Footer'

export default function CreateGroup(){
    return (
        <>
            <Navbar />
            <main className="create-group-main">
                <h1 className="create-group-title">สร้างกลุ่มอ่านหนังสือ</h1>
                <CreateGroupForm />
            </main>
            <Footer />
        </>
    )
}