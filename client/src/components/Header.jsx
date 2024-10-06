import Navbar from "./Navbar";

export default function Header(){
  return (
    <header className='flex flex-wrap gap-5 flex-row justify-evenly shadow-md ' >
      <div className="logo ">Petal Palette</div>
      <Navbar />
      
    </header>
  )
};