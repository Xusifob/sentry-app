import React, { FC } from "react";
import OfflineLayout from "@/components/templates/OfflineLayout";
import H2 from "@/components/atoms/H2";

const PrivacyPolicy: FC = () => {

  return (<OfflineLayout
    containerClassName={'mx-auto container overflow-auto mt-8'}
  >

    <h1 className='text-2xl font-bold' >Privacy Policy</h1>

    <H2>1. Introduction</H2>

    <p className='mb-4'>Welcome to WordGenius. We are committed to protecting your
            personal data and
              respecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your information when you visit
            our website.
              This
              policy is in compliance with the General Data Protection Regulation (GDPR).</p>

    <H2>2. Data Controller</H2>

    <p className='mb-4'>Bastien MALAHIEUDE is the data controller and is responsible for
            your personal data. If you have any
            questions about this privacy policy, including any requests to exercise your legal rights,
            please contact us
            using the details set out below.

            Contact Details: contact@bastienmalahieude.fr</p>

    <H2>3. The Data We Collect About You</H2>

    <p className='mb-4'>Personal data, or personal information, means any information
            about an individual from which that person can
            be identified. The only personal data we collect are your email address, given name and
            family name.</p>

    <H2>4. How Is Your Personal Data Collected?</H2>

    <p className='mb-4'>We use different methods to collect data from and about you,
            including through direct interactions. You may
            give us your email address by filling in forms or by corresponding with us by email or otherwise.</p>

    <H2>5. How We Use Your Personal Data</H2>

    <p className='mb-4'>We will only use your personal data when the law allows us to.
            Most commonly, we will use your personal data
            in the following circumstances:</p>

    <ul className='mb-4 list-disc pl-4' >
      <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
      <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not
                override those interests.
      </li>
    </ul>

    <p className='mb-4'>Purposes for which we will use your personal data:</p>

    <ul className='mb-4 list-disc pl-4'>
      <li> To register you as a new customer.</li>
      <li> To manage our relationship with you.</li>
    </ul>

    <H2>6. Disclosures of Your Personal Data</H2>

    <p className='mb-4'>We do not share your personal data with any parties</p>

    <H2>7. Data Security</H2>

    <p className='mb-4'>We have put in place appropriate security measures to prevent
            your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.</p>

    <H2>8. Data Retention</H2>

    <p className='mb-4'>We will only retain your personal data for as long as necessary
            to fulfill the purposes we collected it for, including for the purposes of satisfying any legal,
            accounting, or reporting requirements.</p>

    <H2>9. Your Legal Rights</H2>

    <p className='mb-4'>Under certain circumstances, you have rights under data protection
            laws in relation to your personal data. These include the right to request access, correction,
            erasure, restriction, transfer, to object to processing, to portability of data, and
            (where the lawful ground of processing is consent) to withdraw consent.</p>

    <H2>10. Changes to This Policy</H2>

    <p className='mb-4'>We may update this policy from time to time. You will be notified
            of any changes.</p>

    <H2>11. Contact Us</H2>

    <p className='mb-4'>If you have any questions about this privacy policy or our privacy
            practices, please contact us at contact@bastienmalahieude.fr</p>
  </OfflineLayout>);

};

export default PrivacyPolicy;