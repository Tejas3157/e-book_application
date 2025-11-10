import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

function PrivacyPolicy() {
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
              <FaShieldAlt className="text-success mb-3" style={{ fontSize: '4rem' }} />
              <h1 className="fw-bold mb-3">
                <span style={{ color: "#00d4ff" }}>Privacy</span> <span style={{ color: "#ff8a00" }}>Policy</span>
              </h1>
              <p className="text-muted">Last Updated: January 2025</p>
            </div>

            <div style={{ lineHeight: '1.8' }}>
              <section className="mb-4">
                <h3 className="fw-bold mb-3">1. Information We Collect</h3>
                <p>We collect several types of information from and about users of our Service:</p>
                
                <h5 className="fw-bold mt-3">Personal Information</h5>
                <ul>
                  <li>Name and email address</li>
                  <li>Phone number (optional)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Account credentials</li>
                </ul>

                <h5 className="fw-bold mt-3">Usage Information</h5>
                <ul>
                  <li>Books you view, read, or purchase</li>
                  <li>Reading preferences and history</li>
                  <li>Search queries and bookmarks</li>
                  <li>Device information and IP address</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">2. How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our Service</li>
                  <li>Process your transactions and send related information</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Personalize your experience and provide content recommendations</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and fraudulent activity</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">3. Information Sharing and Disclosure</h3>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information only in the following circumstances:
                </p>
                <ul>
                  <li>With your consent</li>
                  <li>With service providers who perform services on our behalf</li>
                  <li>To comply with legal obligations or protect rights and safety</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">4. Data Security</h3>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal 
                  information. However, no method of transmission over the Internet or electronic storage 
                  is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">5. Data Retention</h3>
                <p>
                  We retain your personal information for as long as necessary to provide our Service and 
                  fulfill the purposes described in this Privacy Policy. We may also retain information as 
                  required by law or for legitimate business purposes.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">6. Your Rights and Choices</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Access, update, or delete your personal information</li>
                  <li>Opt-out of promotional communications</li>
                  <li>Request a copy of your data</li>
                  <li>Restrict or object to certain processing of your data</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">7. Cookies and Tracking Technologies</h3>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Service and 
                  hold certain information. You can instruct your browser to refuse all cookies or to 
                  indicate when a cookie is being sent.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">8. Children's Privacy</h3>
                <p>
                  Our Service is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you are a parent or guardian 
                  and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">9. International Data Transfers</h3>
                <p>
                  Your information may be transferred to and maintained on computers located outside of 
                  your country where data protection laws may differ. By using our Service, you consent 
                  to such transfers.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">10. Changes to This Privacy Policy</h3>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="fw-bold mb-3">11. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <p className="fw-bold">
                  Email: <a href="mailto:privacy@bookverseapp.com">privacy@bookverseapp.com</a><br />
                  Phone: +91 123 456 7890
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;