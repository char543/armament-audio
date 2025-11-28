'use client'

import type React from 'react'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id='contact' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6'>
            Get In Touch
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Ready to join our roster or have questions about our services? We'd
            love to hear from you and discuss how we can work together.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <Card className='bg-card border-border'>
            <CardHeader className='pb-6'>
              <CardTitle className='font-headline font-bold text-2xl text-card-foreground'>
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-card-foreground mb-3'
                    >
                      Name
                    </label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className='bg-input border-border text-foreground h-12'
                      placeholder='Your name'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-card-foreground mb-3'
                    >
                      Email
                    </label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className='bg-input border-border text-foreground h-12'
                      placeholder='your@email.com'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-medium text-card-foreground mb-3'
                  >
                    Subject
                  </label>
                  <Input
                    id='subject'
                    name='subject'
                    type='text'
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className='bg-input border-border text-foreground h-12'
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-card-foreground mb-3'
                  >
                    Message
                  </label>
                  <Textarea
                    id='message'
                    name='message'
                    required
                    rows={8}
                    value={formData.message}
                    onChange={handleChange}
                    className='bg-input border-border text-foreground resize-none min-h-[200px]'
                    placeholder='Tell us about your project, goals, or questions...'
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 mt-8'
                >
                  <Send className='mr-2 h-4 w-4' />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className='space-y-8'>
            <Card className='bg-card border-border'>
              <CardContent className='p-8'>
                <h3 className='font-headline font-bold text-xl text-card-foreground mb-8'>
                  Contact Information
                </h3>

                <div className='space-y-8'>
                  <div className='flex items-start gap-4'>
                    <Mail className='h-6 w-6 text-primary mt-1 shrink-0' />
                    <div className='space-y-1'>
                      <p className='font-medium text-card-foreground'>Email</p>
                      <p className='text-muted-foreground'>
                        info@armamentaudio.com
                      </p>
                      <p className='text-muted-foreground'>
                        artists@armamentaudio.com
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <Phone className='h-6 w-6 text-primary mt-1 shrink-0' />
                    <div className='space-y-1'>
                      <p className='font-medium text-card-foreground'>Phone</p>
                      <p className='text-muted-foreground'>+44 7123 456 789</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <MapPin className='h-6 w-6 text-primary mt-1 shrink-0' />
                    <div className='space-y-1'>
                      <p className='font-medium text-card-foreground'>
                        Address
                      </p>
                      <p className='text-muted-foreground'>
                        123 Music Row
                        <br />
                        Nashville, TN 37203
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-card border-border'>
              <CardContent className='p-8'>
                <h3 className='font-headline font-bold text-xl text-card-foreground mb-6'>
                  For Artists
                </h3>
                <p className='text-muted-foreground leading-relaxed mb-6'>
                  Interested in joining our roster? We're always looking for
                  talented artists who share our passion for innovative music.
                </p>
                <p className='text-sm text-muted-foreground'>
                  Please include links to your music, press kit, and a brief
                  description of your artistic vision when reaching out.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
