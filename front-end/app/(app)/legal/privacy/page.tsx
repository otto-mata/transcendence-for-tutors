"use client";

import { ArrowLeft, Shield, Eye, Lock, UserCheck, Bell, Trash2, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to ft_transcendence ("we," "our," or "us"). We are committed to protecting your privacy 
              and ensuring you have a positive experience on our social platform. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Account information: username, email address, password (encrypted)</li>
                  <li>Profile information: display name, profile picture, bio</li>
                  <li>Location data (if you choose to share it)</li>
                  <li>Your preferences and interests</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Content You Share</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Photos and videos you upload</li>
                  <li>Posts, comments, and messages</li>
                  <li>Likes, saves, and other interactions</li>
                  <li>Direct messages with other users</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Automatically Collected Data</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and approximate location</li>
                  <li>Usage patterns and preferences</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
            </div>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>To create and manage your account</li>
              <li>To facilitate connections with other users</li>
              <li>To display your profile to other users</li>
              <li>To enable communication between users</li>
              <li>To personalize your experience and show relevant content</li>
              <li>To send you notifications about messages and activity</li>
              <li>To improve our services and develop new features</li>
              <li>To detect and prevent fraud, abuse, and security issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Protection & Security</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We implement robust security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>End-to-end encryption for private messages</li>
              <li>Secure password hashing using bcrypt</li>
              <li>HTTPS encryption for all data transfers</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data storage with encryption at rest</li>
            </ul>
          </section>

          {/* Sharing Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sharing Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>With other users:</strong> Your public profile, posts, and photos are visible to other users</li>
              <li><strong>With service providers:</strong> Third parties that help us operate our services (hosting, analytics)</li>
              <li><strong>For legal reasons:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights & Choices</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Access & Portability</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Request a copy of your personal data</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Correction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Update or correct inaccurate information</p>
              </div>
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Deletion</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Request deletion of your account and data</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Opt-out</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Unsubscribe from marketing communications</p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Retention</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide 
              you services. If you delete your account, we will delete your personal data within 30 days, except 
              for information we are required to retain for legal purposes or to prevent fraud and abuse.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies & Tracking</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Keep you signed in</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns to improve our service</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              You can control cookies through your browser settings. However, disabling cookies may affect 
              certain features of our service.
            </p>
          </section>

          {/* Age Restriction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Age Restrictions</h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Our service is intended for users who are at least 18 years old. We do not knowingly collect 
                personal information from anyone under 18. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us immediately.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <p className="text-gray-900 dark:text-white font-medium">ft_transcendence Team</p>
              <p className="text-gray-600 dark:text-gray-300">Email: ijaber@student.42.fr</p>
              <p className="text-gray-600 dark:text-gray-300">Address: 42 School, Paris, France</p>
            </div>
          </section>

          {/* Updates */}
          <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Policy Updates</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant 
              changes by posting a notice on our service or sending you an email. Your continued use of 
              our service after such modifications constitutes your acceptance of the updated policy.
            </p>
          </section>

        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <Link 
            href="/legal/terms" 
            className="text-purple-500 hover:text-purple-600 font-medium"
          >
            Read our Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
