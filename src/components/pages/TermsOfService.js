import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFileContract } from 'react-icons/fa';

function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'linear-gradient(135deg, #000428, #004e92)', minHeight: '100vh' }}>
      <div className="container py-5">
        <button className="btn btn-outline-light mb-4" onClick={() => navigate('/')}>
          <FaArrowLeft className="me-2" />
          Back to Home
        </button>

        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            <div className="text-center mb-5">
              <FaFileContract className="text-primary mb-3" style={{ fontSize: '4rem' }} />
              <h1 className="fw-bold mb-3">
                <span style={{ color: "#00d4ff" }}>Terms</span> of <span style={{ color: "#ff8a00" }}>Service</span>
              </h1>
              <p className="text-muted">Last Updated: January 2025</p>
            </div>

            <div style={{ lineHeight: '1.8' }}>
              <section className="mb-4">
                <h3 className="fw-bold mb-3">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using BookVerse ("Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to these Terms of Service, please do not 
                  use our Service.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">2. Use License</h3>
                <p>
                  Permission is granted to temporarily access the books on BookVerse for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
                <p>Under this license, you may not:</p>
                <ul>
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on BookVerse</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">3. Account Registration</h3>
                <p>
                  To access certain features of the Service, you must register for an account. You agree to:
                </p>
                <ul>
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">4. User Content</h3>
                <p>
                  You are responsible for any content you post, upload, or share through the Service. 
                  You retain all rights to your content, but grant BookVerse a license to use, modify, 
                  and display such content as necessary to provide the Service.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">5. Prohibited Uses</h3>
                <p>You agree not to use the Service:</p>
                <ul>
                  <li>In any way that violates any applicable law or regulation</li>
                  <li>To transmit any advertising or promotional material</li>
                  <li>To impersonate or attempt to impersonate BookVerse or another user</li>
                  <li>To engage in any automated use of the system</li>
                  <li>To interfere with or circumvent the security features of the Service</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">6. Intellectual Property</h3>
                <p>
                  The Service and its original content, features, and functionality are owned by BookVerse 
                  and are protected by international copyright, trademark, patent, trade secret, and other 
                  intellectual property laws.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">7. Termination</h3>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever, 
                  including without limitation if you breach the Terms.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">8. Limitation of Liability</h3>
                <p>
                  In no event shall BookVerse, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">9. Changes to Terms</h3>
                <p>
                  We reserve the right to modify or replace these Terms at any time. We will provide notice 
                  of any significant changes. Your continued use of the Service after such modifications 
                  constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">10. Contact Information</h3>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="fw-bold">
                  Email: <a href="mailto:legal@bookverseapp.com">legal@bookverseapp.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;