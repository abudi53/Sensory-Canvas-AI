export default function PrivacyPolicyPage() {
    return (
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4">
          <p>
            Welcome to Sensory Canvas AI (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;). We are committed
            to protecting your personal information and your right to privacy. If
            you have any questions or concerns about this privacy notice, or our
            practices with regards to your personal information, please contact
            us.
          </p>
  
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Information We Collect
          </h2>
          <p>
            We may collect personal information that you voluntarily provide to us
            when you register on the application, express an interest in
            obtaining information about us or our products and services, when you
            participate in activities on the application or otherwise when you
            contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of
            your interactions with us and the application, the choices you make
            and the products and features you use. The personal information we
            collect may include the following:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Personal Information Provided by You.</strong> We collect
              usernames; passwords; email addresses; and other similar
              information.
            </li>
            <li>
              <strong>Art-related Data.</strong> We collect the prompts you enter
              and the images/sounds generated.
            </li>
          </ul>
  
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            How We Use Your Information
          </h2>
          <p>
            We use personal information collected via our application for a
            variety of business purposes described below. We process your
            personal information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract with
            you, with your consent, and/or for compliance with our legal
            obligations.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>To facilitate account creation and logon process.</li>
            <li>To manage user accounts.</li>
            <li>To send administrative information to you.</li>
            <li>To protect our Services.</li>
            <li>To respond to user inquiries/offer support to users.</li>
            <li>
              For other business purposes, such as data analysis, identifying
              usage trends, determining the effectiveness of our promotional
              campaigns and to evaluate and improve our Services, products,
              marketing and your experience.
            </li>
          </ul>
  
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Will Your Information Be Shared With Anyone?
          </h2>
          <p>
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill
            business obligations.
          </p>
  
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            How Long Do We Keep Your Information?
          </h2>
          <p>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy notice, unless a
            longer retention period is required or permitted by law (such as tax,
            accounting or other legal requirements).
          </p>
  
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            How Do We Keep Your Information Safe?
          </h2>
          <p>
            We have implemented appropriate technical and organizational security
            measures designed to protect the security of any personal information
            we process. However, despite our safeguards and efforts to secure
            your information, no electronic transmission over the Internet or
            information storage technology can be guaranteed to be 100% secure,
            so we cannot promise or guarantee that hackers, cybercriminals, or
            other unauthorized third parties will not be able to defeat our
            security, and improperly collect, access, steal, or modify your
            information.
          </p>
  
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            What Are Your Privacy Rights?
          </h2>
          <p>
            In some regions (like the European Economic Area and UK), you have
            certain rights under applicable data protection laws. These may
            include the right (i) to request access and obtain a copy of your
            personal information, (ii) to request rectification or erasure; (iii)
            to restrict the processing of your personal information; and (iv) if
            applicable, to data portability. In certain circumstances, you may
            also have the right to object to the processing of your personal
            information.
          </p>
  
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Updates To This Notice
          </h2>
          <p>
            We may update this privacy notice from time to time. The updated
            version will be indicated by an updated &quot;Revised&quot; date and the
            updated version will be effective as soon as it is accessible. We
            encourage you to review this privacy notice frequently to be informed
            of how we are protecting your information.
          </p>
  
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            How Can You Contact Us About This Notice?
          </h2>
          <p>
            If you have questions or comments about this notice, you may contact
            us.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }