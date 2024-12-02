export default function Navbar () {
    return (
        <header style={{ backgroundColor: '#4c51bf', color: '#ffffff', padding: '1rem', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Career Pathfinder AI</h1>
            <nav>
              <ul style={{ display: 'flex', gap: '1.5rem' }}>
                <li><a href="#features" style={{ textDecoration: 'none', color: '#ffffff' }}>Features</a></li>
                <li><a href="#about" style={{ textDecoration: 'none', color: '#ffffff' }}>About</a></li>
                <li><a href="#contact" style={{ textDecoration: 'none', color: '#ffffff' }}>Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>
    )
}