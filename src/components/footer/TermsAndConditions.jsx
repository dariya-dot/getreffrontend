import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto pt-24 md:pt-20  mt-14 md:mt-0 px-6 text-gray-800"> <br />
      <h1 className=" text-lg md:text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>
      
      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">1. Introduction</h2>
        <p className="text-sm md:text-base">Welcome to getreference.site ("the Job Reference Platform") . This platform connects job seekers with referrers who can assist in job referrals. By using this platform, you agree to comply with these terms.</p>
      </section>

      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">2. User Roles & Responsibilities</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li><strong>Job Seekers</strong> must provide accurate details about their education, skills, and experience.</li>
          <li><strong>Referrers</strong> should only refer candidates they find suitable.</li>
          <li>Both parties must engage professionally and respectfully.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">3. Account Registration & Security</h2>
        <ul className="list-disc text-sm md:text-base  pl-6">
          <li>Users must complete OTP verification during registration.</li>
          <li>Login credentials must be kept confidential.</li>
          <li>The platform is not responsible for unauthorized account access due to user negligence.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">4. Job Referral Process</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li>Job Seekers can request referrals.</li>
          <li>Referrers can access the seeker's Resume, LinkedIn Profile, GitHub Profile, and Contact Options (Email & WhatsApp).</li>
          <li>If the referrer finds the profile suitable, they can connect via any of the four options.</li>
          <li>Referrers are not obligated to refer every job seeker.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="md:text-xl font-semibold">5. Communication Policy</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li>Communication should be strictly professional and job-related.</li>
          <li>Spamming, solicitation, or unrelated messaging is strictly prohibited.</li>
          <li>The platform is not liable for discussions that happen outside the platform.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="md:text-xl  font-semibold">6. Privacy & Data Protection</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li>Job seekers’ details are only accessible to referrers for referral purposes.</li>
          <li>Users must not share, misuse, or store others' personal data externally.</li>
          <li>Any violation may lead to account suspension or legal action.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="md:text-xl  font-semibold">7. Platform Limitations & Liabilities</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li>The platform does not guarantee job placements.</li>
          <li>It acts only as a connection bridge between job seekers and referrers.</li>
          <li>Users are responsible for their own interactions and decisions.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="md:text-xl  font-semibold">8. Prohibited Activities</h2>
        <ul className="list-disc text-sm md:text-base pl-6">
          <li>Fake profiles, misleading information, and unauthorized data sharing are not allowed.</li>
          <li>Users must not bypass the platform to exploit job seekers or referrers.</li>
          <li>Violation of these rules may lead to account termination.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="md:text-xl  font-semibold">9. Modifications & Updates</h2>
        <p className="text-sm md:text-base">These terms may be updated from time to time. Continued use of the platform means acceptance of the latest terms.</p>
      </section>

      <p className="text-center font-medium">By using this platform, you agree to these Terms & Conditions. If you do not agree, please discontinue use immediately.</p>
    <br />
    </div>
  );
};

export default TermsAndConditions;
