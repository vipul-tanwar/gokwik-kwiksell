"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wand2, Send, RefreshCw, Check, Copy, MessageSquare, Mail } from "lucide-react"

export default function ActionModule() {
  const [selectedChannel, setSelectedChannel] = useState<string>("whatsapp")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [selectedWhatsAppTemplate, setSelectedWhatsAppTemplate] = useState<number | null>(null)
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<number | null>(null)
  const [testSent, setTestSent] = useState<boolean>(false)

  // Mock WhatsApp templates
  const whatsappTemplates = [
    {
      id: 1,
      content:
        "Hi there! We noticed you purchased our BARRIER CARE CREAM. Many customers also love our 2% KOJIC ACID GLOW CREAM which works great with your recent purchase. Would you like to check it out? Here's a special 10% discount: GLOW10",
    },
    {
      id: 2,
      content:
        "Hello! Based on your recent purchase of BARRIER CARE CREAM, we think you might love our bestselling KOJIC ACID GLOW CREAM. It's the perfect addition to your skincare routine! Use code PERFECT10 for 10% off.",
    },
    {
      id: 3,
      content:
        "Your skin deserves the best! Since you're enjoying our BARRIER CARE CREAM, we wanted to recommend our KOJIC ACID GLOW CREAM which many customers use together for amazing results. Try it with code GLOWUP for 10% off your purchase!",
    },
  ]

  // Mock Email templates
  const emailTemplates = [
    {
      id: 1,
      subject: "Complete Your Skincare Routine with This Perfect Match",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>The Perfect Addition to Your Skincare Routine</h2>
          <p>Hi there,</p>
          <p>Thank you for purchasing our BARRIER CARE CREAM. We hope you're enjoying it!</p>
          <p>We noticed many customers who love this product also enjoy our <strong>2% KOJIC & 1% GLYCOLIC ACID PIGMENTATION CORRECTOR</strong>, which works perfectly with the Barrier Care Cream for enhanced results.</p>
          <p><strong>Why they work great together:</strong></p>
          <ul>
            <li>The Barrier Cream protects and hydrates your skin</li>
            <li>The Kojic Acid Cream helps brighten and even skin tone</li>
            <li>Together, they provide a complete skincare solution</li>
          </ul>
          <p><a href="#" style="background-color: #4A90E2; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Shop Now with 10% Off: GLOW10</a></p>
          <p>Best regards,<br>The Hyphen Team</p>
        </div>
      `,
    },
    {
      id: 2,
      subject: "We Have a Recommendation Just for You",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Enhance Your Results with This Perfect Pairing</h2>
          <p>Hello,</p>
          <p>We wanted to thank you for choosing our BARRIER CARE CREAM and hope it's working well for you!</p>
          <p>Based on your purchase, we have a personalized recommendation that many of our customers have found beneficial: our <strong>2% KOJIC & 1% GLYCOLIC ACID PIGMENTATION CORRECTOR</strong>.</p>
          <p>This powerful formula helps with:</p>
          <ul>
            <li>Evening skin tone and reducing dark spots</li>
            <li>Brightening complexion</li>
            <li>Complementing the hydrating effects of your Barrier Cream</li>
          </ul>
          <p><a href="#" style="background-color: #4A90E2; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Try It Now with 10% Off: PERFECT10</a></p>
          <p>Yours in skincare,<br>The Hyphen Team</p>
        </div>
      `,
    },
  ]

  const handleSendTest = async () => {
    // Validate phone number
    if (!phoneNumber || phoneNumber.trim() === '') {
      alert('Please enter a phone number');
      return;
    }

    // Basic phone number validation
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedNumber.length < 10 || cleanedNumber.length > 15) {
      alert('Please enter a valid phone number (10-15 digits)');
      return;
    }

    try {
      // Format phone number to ensure it has country code
      const formattedPhone = phoneNumber.startsWith('+') ?
        phoneNumber.replace(/\D/g, '') :
        `91${phoneNumber.replace(/\D/g, '')}`;
      
      console.log(`Sending test message to: ${formattedPhone}`);
      
      // Instead of directly calling the external API with the token exposed in client-side code,
      // we'll call our own server-side API endpoint that will securely handle the token
      const response = await fetch('/api/send-whatsapp-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "to": formattedPhone,
          "templateId": "simple_utility_copy",
          "language": "en",
          "parameters": []
        })
      });
      
      if (response.ok) {
        console.log('Message sent successfully');
        setTestSent(true);
        setTimeout(() => setTestSent(false), 3000);
      } else {
        console.error('Failed to send message:', await response.text());
        alert('Failed to send test message. Check console for details.');
      }
    } catch (error) {
      console.error('Error sending test message:', error);
      alert('Error sending test message. Check console for details.');
    }
  }

  const handleGenerateTemplates = () => {
    // In a real implementation, this would trigger AI to generate new templates
    // For now, we'll just simulate a loading state
    console.log("Generating new templates...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" style={{ color: "#004B8D" }}>Action Module</h2>
        <div className="text-sm text-gray-500">Configure what content should be sent to customers</div>
      </div>

      <Card style={{ borderTop: "3px solid #F7B24F" }}>
        <CardHeader>
          <CardTitle>Communication Channels</CardTitle>
          <CardDescription>Select which channels to use for your cross-sell messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" style={{ color: "#004B8D" }} />
                <Label htmlFor="whatsapp-enabled" className="font-medium">
                  WhatsApp
                </Label>
              </div>
              <Switch
                id="whatsapp-enabled"
                defaultChecked
                onCheckedChange={(checked) => {
                  if (checked) setSelectedChannel((prev) => (prev === "email" ? "both" : "whatsapp"))
                  else setSelectedChannel((prev) => (prev === "both" ? "email" : ""))
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" style={{ color: "#F7B24F" }} />
                <Label htmlFor="email-enabled" className="font-medium">
                  Email
                </Label>
              </div>
              <Switch
                id="email-enabled"
                defaultChecked
                onCheckedChange={(checked) => {
                  if (checked) setSelectedChannel((prev) => (prev === "whatsapp" ? "both" : "email"))
                  else setSelectedChannel((prev) => (prev === "both" ? "whatsapp" : ""))
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: "#f0f5fa" }}>
          <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Message Templates</TabsTrigger>
          <TabsTrigger value="test" className="data-[state=active]:bg-white data-[state=active]:text-[#004B8D] data-[state=active]:shadow-sm">Test Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="pt-6">
          <div className="space-y-6">
            {(selectedChannel === "whatsapp" || selectedChannel === "both") && (
              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" style={{ color: "#004B8D" }} />
                    WhatsApp Templates
                  </CardTitle>
                  <CardDescription>Select or generate WhatsApp message templates for cross-sell</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={handleGenerateTemplates} style={{ borderColor: "#004B8D", color: "#004B8D" }}>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate New Templates
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {whatsappTemplates.map((template) => (
                        <div
                          key={template.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedWhatsAppTemplate === template.id
                              ? "border-[#004B8D] bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedWhatsAppTemplate(template.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">Template {template.id}</div>
                            {selectedWhatsAppTemplate === template.id && <Check className="h-5 w-5" style={{ color: "#004B8D" }} />}
                          </div>
                          <div className="text-sm text-gray-700 whitespace-pre-line">{template.content}</div>
                          <div className="flex justify-end mt-2 space-x-2">
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Regenerate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {(selectedChannel === "email" || selectedChannel === "both") && (
              <Card style={{ borderTop: "3px solid #F7B24F" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" style={{ color: "#F7B24F" }} />
                    Email Templates
                  </CardTitle>
                  <CardDescription>Select or generate email templates for cross-sell</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={handleGenerateTemplates} style={{ borderColor: "#004B8D", color: "#004B8D" }}>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate New Templates
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {emailTemplates.map((template) => (
                        <div
                          key={template.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedEmailTemplate === template.id
                              ? "border-[#F7B24F] bg-orange-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedEmailTemplate(template.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{template.subject}</div>
                            {selectedEmailTemplate === template.id && <Check className="h-5 w-5" style={{ color: "#F7B24F" }} />}
                          </div>
                          <Separator className="my-2" />
                          <div className="text-sm text-gray-700 max-h-[200px] overflow-y-auto">
                            <div dangerouslySetInnerHTML={{ __html: template.content }} />
                          </div>
                          <div className="flex justify-end mt-2 space-x-2">
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Regenerate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="test" className="pt-6">
          <Card style={{ borderTop: "3px solid #F7B24F" }}>
            <CardHeader>
              <CardTitle>Test Your Cross-Sell Messages</CardTitle>
              <CardDescription>Send test messages to verify your templates before activating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {testSent && (
                  <Alert className="bg-green-50 mb-4" style={{ borderColor: "#004B8D" }}>
                    <Check className="h-4 w-4" style={{ color: "#004B8D" }} />
                    <AlertDescription className="text-green-700 ml-2">Test message sent successfully!</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Channel to Test</Label>
                    <RadioGroup
                      defaultValue="whatsapp"
                      className="flex space-x-4"
                      onValueChange={(value) => setSelectedChannel(value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="test-whatsapp" />
                        <Label htmlFor="test-whatsapp" className="cursor-pointer">
                          WhatsApp
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="test-email" />
                        <Label htmlFor="test-email" className="cursor-pointer">
                          Email
                        </Label>
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="test-both" />
                        <Label htmlFor="test-both" className="cursor-pointer">
                          Both
                        </Label>
                      </div> */}
                    </RadioGroup>
                  </div>

                  {(selectedChannel === "whatsapp" || selectedChannel === "both") && (
                    <div className="space-y-2">
                      <Label htmlFor="test-phone">WhatsApp Number</Label>
                      <Input
                        id="test-phone"
                        placeholder="+91 9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <p className="text-xs text-gray-500">Enter your WhatsApp number to receive a test message</p>
                    </div>
                  )}

                  {(selectedChannel === "email" || selectedChannel === "both") && (
                    <div className="space-y-2">
                      <Label htmlFor="test-email-address">Email Address</Label>
                      <Input
                        id="test-email-address"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p className="text-xs text-gray-500">Enter your email address to receive a test message</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Select Product Bundle to Test</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product bundle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bundle1">BARRIER CREAM → KOJIC ACID CREAM</SelectItem>
                        <SelectItem value="bundle2">VITAMIN C SERUM → HYALURONIC ACID SERUM</SelectItem>
                        <SelectItem value="bundle3">RETINOL NIGHT CREAM → NIACINAMIDE SERUM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSendTest} style={{ backgroundColor: "#004B8D" }}>
                <Send className="h-4 w-4 mr-2" />
                Send Test Message
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" style={{ borderColor: "#004B8D", color: "#004B8D" }}>Cancel</Button>
        <Button style={{ backgroundColor: "#004B8D" }}>Activate Cross-Sell Journey</Button>
      </div>
    </div>
  )
}
