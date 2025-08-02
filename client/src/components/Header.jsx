import Navbar from "./Navbar";

export default function Header(){
  return (
    <header className='flex flex-wrap gap-5 flex-row md:justify-evenly justify-around shadow-md ' >
      <div className="logo ">Petal Palette</div>
      <Navbar />
      
    </header>
  )
};