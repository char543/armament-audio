import { Card, CardContent } from '@/components/ui/card'
import { Users, Award, Headphones } from 'lucide-react'

export function AboutSection() {
  const features = [
    {
      icon: Users,
      title: 'Artist Development',
      description:
        'We nurture talent and provide comprehensive support for emerging and established artists.',
    },
    {
      icon: Award,
      title: 'Quality Production',
      description:
        'State-of-the-art recording facilities and industry-leading production standards.',
    },
    {
      icon: Headphones,
      title: 'Creative Freedom',
      description:
        'Artists maintain creative control while benefiting from our industry expertise and resources.',
    },
  ]

  return (
    <section id='about' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6'>
            About Our Label
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Founded on the belief that great music deserves great support,
            Armament Audio is an independent label dedicated to fostering
            artistic excellence and innovation.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='bg-card border-border hover:border-primary/50 transition-colors duration-300'
            >
              <CardContent className='p-8 text-center'>
                <feature.icon className='h-12 w-12 text-primary mx-auto mb-4' />
                <h3 className='font-headline font-bold text-xl text-card-foreground mb-3'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='bg-card rounded-lg p-8 border border-border'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            <div>
              <h3 className='font-headline font-bold text-2xl text-card-foreground mb-4'>
                Our Mission
              </h3>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                We believe in the power of music to connect, inspire, and
                transform. Our mission is to provide a platform where artists
                can thrive creatively while reaching audiences who appreciate
                authentic, innovative music.
              </p>
              <p className='text-muted-foreground leading-relaxed'>
                From intimate acoustic sessions to bold experimental projects,
                we support diverse musical expressions that push boundaries and
                create lasting impact.
              </p>
            </div>
            <div className='bg-muted/20 rounded-lg p-6 text-center'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className='text-3xl font-headline font-black text-primary mb-2'>
                    50+
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {/* Artists Signed */}
                    Plays On Soundcloud
                  </div>
                </div>
                <div>
                  <div className='text-3xl font-headline font-black text-primary mb-2'>
                    200+
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {/* Releases */}
                    Tracks Uploaded
                  </div>
                </div>
                <div>
                  <div className='text-3xl font-headline font-black text-primary mb-2'>
                    10M+
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {/* Streams */}
                    Unfinished Projects
                  </div>
                </div>
                <div>
                  <div className='text-3xl font-headline font-black text-primary mb-2'>
                    15
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {/* Years Active */}
                    Followers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
