import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto  mt-14 py-24 md:py-12 md:mt-0 px-6 text-gray-800">
      <br />  
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">Privacy Policy</h1>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">1. Introduction</h2>
        <p className="text-sm">Welcome to getreference.site. This Privacy Policy outlines how we collect, use, and protect user information. By using our platform, you agree to the practices described here.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">2. Information We Collect</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li><strong>Personal Information:</strong> Name, email, phone number, LinkedIn/GitHub profiles, resume details.</li>
          <li><strong>Usage Data:</strong> Interaction with the platform, referral requests, and communication history.</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">3. How We Use Your Information</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li>To connect job seekers with referrers.</li>
          <li>To improve platform functionality and user experience.</li>
          <li>To provide customer support and respond to inquiries.</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">4. Data Security</h2>
        <p className="text-sm md:text-base">We implement security measures to protect user data. However, no online platform is 100% secure. Users are responsible for safeguarding their credentials.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">5. Sharing of Information</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li>Referrers can access job seekers' profiles only for referral purposes.</li>
          <li>We do not sell or rent user data to third parties.</li>
          <li>Information may be shared if required by law.</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">6. User Rights</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li>Users can edit or delete their profiles at any time.</li>
          <li>Users can request data removal by contacting support.</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">7. No Live Chat or Chat Process</h2>
        <p className="text-sm md:text-base">Our platform does not provide live chat or any chat-based communication. Users can connect through available contact options like email, WhatsApp, LinkedIn, or GitHub.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">8. Changes to Privacy Policy</h2>
        <p className="text-sm md:text-base">We may update this policy as needed. Users will be notified of any significant changes.</p>
      </section>
      
      <p className="text-center text-sm md:text-lg font-medium">By using this platform, you agree to this Privacy Policy. If you do not agree, please discontinue use immediately.</p>
    </div>
  );
};

export default PrivacyPolicy;
