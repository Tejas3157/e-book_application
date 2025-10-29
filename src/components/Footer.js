import React from 'react'


function Footer() {
  return (
     <div>
            {/*  FOOTER  */}
            <footer className="text-center text-light py-4 bottom-0 w-100" style={{ background: "linear-gradient(90deg, #000428 100%, #004e92 0% )", }} >
                <p className="mb-0">
                    © 2025 <span style={{ color: "#00d4ff" }}>Book</span>
                    <span style={{ color: "#ff8a00" }}>Verse</span>. All Rights Reserved.
                </p>
            </footer>
        </div>
  )
}

export default Footer