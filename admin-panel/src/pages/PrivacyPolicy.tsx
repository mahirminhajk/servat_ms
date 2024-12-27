import { Button } from "@/components/ui/button";
import { House, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <Store className="h-12 w-12" />
        <div>
          <h1 className="text-3xl font-bold">SERVAT BUSINESS</h1>
          <p className="text-sm">Privacy Policy</p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="ml-auto px-4 py-2 rounded-lg border border-current"
          variant="ghost"
        >
          <House /> Home
        </Button>
      </header>

      {/* Content */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p>
          At SERVAT BUSINESS, your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your personal
          information.
        </p>

        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Personal Information: Name, email address, phone number, etc.</li>
          <li>
            Usage Data: Information about how you interact with our website.
          </li>
          <li>
            Cookies: Small data files stored on your device to improve your
            experience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">How We Use Your Information</h2>
        <p>
          We use your information to provide better services, communicate with
          you, and ensure a seamless experience. Examples include:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Responding to inquiries or support requests.</li>
          <li>
            Improving our website’s functionality and personalizing your
            experience.
          </li>
          <li>Sending updates, promotional materials, and service notices.</li>
        </ul>

        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <ul className="space-y-1">
          <li>
            Email:{" "}
            <a href="mailto:support@servatbusiness.com">
              support@servatbusiness.com
            </a>
          </li>
          <li>Phone: +91 123-456-7890</li>
          <li>Address: 123 Fake Street, Placeholder City, 00000</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm">
        &copy; {new Date().getFullYear()} SERVAT Business. All Rights Reserved.
      </footer>
    </div>
  );
}

export default PrivacyPolicy;
