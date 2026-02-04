"use client";

import { ArrowLeft, FileText, Users, Heart, Ban, Scale, MessageSquare, Camera, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 px-4">
        <div className="max-w-4xl mx-auto lg:ml-8 xl:mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
              <p className="text-white/80 mt-1">Last updated: February 2, 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto lg:ml-8 xl:mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to ft_transcendence</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of ft_transcendence, a social 
              platform designed to help people connect, share moments, and build meaningful relationships. 
              By creating an account or using our service, you agree to be bound by these Terms.
            </p>
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Please read these Terms carefully before using our service. If you do not agree with these Terms, 
                you may not access or use ft_transcendence.
              </p>
            </div>
          </section>

          {/* Eligibility */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Eligibility</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              To use ft_transcendence, you must:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Be at least <strong>18 years old</strong></li>
              <li>Be legally able to enter into a binding contract</li>
              <li>Not be prohibited from using the service under applicable laws</li>
              <li>Not have been previously banned from our service</li>
              <li>Not be a registered sex offender</li>
            </ul>
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-red-800 dark:text-red-200 font-medium">
                ⚠️ Users under 18 are strictly prohibited.
              </p>
            </div>
          </section>

          {/* Account Rules */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Responsibilities</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              When creating and using your account, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Use only your own photos that clearly show your face</li>
              <li>Maintain only one account per person</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Not share or transfer your account to anyone</li>
            </ul>
          </section>

          {/* Community Guidelines */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Guidelines</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              ft_transcendence is built on respect and authenticity. We expect all users to:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">✓ Do</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Be respectful and kind to others</li>
                  <li>• Report suspicious or harmful behavior</li>
                  <li>• Use recent and authentic photos</li>
                  <li>• Communicate honestly and openly</li>
                  <li>• Respect others' boundaries</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">✗ Don't</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Harass, bully, or intimidate others</li>
                  <li>• Send unsolicited explicit content</li>
                  <li>• Catfish or impersonate others</li>
                  <li>• Spam or send promotional content</li>
                  <li>• Discriminate based on any characteristic</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prohibited Content */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prohibited Content & Behavior</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The following content and behaviors are strictly prohibited and will result in immediate account termination:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-3">
              <p className="text-gray-700 dark:text-gray-300"><strong>• Illegal content:</strong> Any content that violates local, national, or international laws</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>• Explicit content involving minors:</strong> Absolutely zero tolerance</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>• Hate speech:</strong> Content promoting violence or discrimination</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>• Harassment:</strong> Threatening, stalking, or intimidating behavior</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>• Scams & fraud:</strong> Attempts to deceive or defraud other users</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>• Prostitution:</strong> Soliciting or offering sexual services for money</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>• Violence:</strong> Graphic violence or threats of harm</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>• Impersonation:</strong> Pretending to be someone else</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>• Malware:</strong> Distributing viruses or harmful software</p>
            </div>
          </section>

          {/* Content Ownership */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Ownership & License</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              You retain ownership of all content you post on ft_transcendence. However, by posting content, you grant us:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>A non-exclusive, royalty-free, worldwide license to use, display, and distribute your content</li>
              <li>The right to sublicense this content to other users for viewing within the platform</li>
              <li>Permission to use your content for promotional purposes (with your consent)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              You represent that you own or have the necessary rights to all content you post, and that it does 
              not infringe on any third party's intellectual property rights.
            </p>
          </section>

          {/* Messaging */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messaging & Communication</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              When communicating with other users:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Be respectful and consent-minded in all interactions</li>
              <li>Do not send unsolicited explicit images or messages</li>
              <li>Do not continue messaging someone who has asked you to stop</li>
              <li>Report any harassment or inappropriate behavior immediately</li>
              <li>Do not share personal contact information too quickly for your safety</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Account Termination</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account at any time if you:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Violate these Terms of Service</li>
              <li>Engage in prohibited behavior</li>
              <li>Receive multiple reports from other users</li>
              <li>Attempt to circumvent our security measures</li>
              <li>Create multiple accounts after being banned</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              You may delete your account at any time through your profile settings. Upon deletion, your 
              profile and content will be removed within 30 days.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-gray-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disclaimers & Limitations</h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>No Guarantees:</strong> We do not guarantee any specific outcomes through our service.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>User Conduct:</strong> We are not responsible for the behavior of other users. 
                All interactions are at your own risk.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Service Availability:</strong> We strive for 99.9% uptime but do not guarantee 
                uninterrupted access to the service.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, 
                ft_transcendence shall not be liable for any indirect, incidental, special, or 
                consequential damages.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may modify these Terms at any time. We will notify you of significant changes via email 
              or through a notice on our service. Your continued use of ft_transcendence after changes 
              become effective constitutes your acceptance of the new Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of France, 
              without regard to its conflict of law provisions. Any disputes arising from these Terms 
              shall be resolved in the courts of Paris, France.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <p className="text-gray-900 dark:text-white font-medium">ft_transcendence Team</p>
              <p className="text-gray-600 dark:text-gray-300">Email: ijaber@student.42.fr</p>
              <p className="text-gray-600 dark:text-gray-300">Address: 42 School, Paris, France</p>
            </div>
          </section>

        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <Link 
            href="/legal/privacy" 
            className="text-purple-500 hover:text-purple-600 font-medium"
          >
            Read our Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
