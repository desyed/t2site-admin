import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const pricingData = [
  {
    id: 'starter',
    title: 'Free',
    description: 'Ideal for small teams!',
    monthly: 0,
  },
  {
    id: 'professional',
    title: 'Professional',
    description: 'Ideal for business owners.',
    monthly: 20,
  },
];

export function BillingDashboard() {
  return (
    <div>
      <PageHeader title="Billing" />

      <div className="dashboard-container space-y-6">
        <div className="flex items-center gap-6 max-lg:flex-col lg:w-1/2">
          {pricingData.map((plan) => {
            const price = plan.monthly;
            const period = 'month';

            return (
              <Card
                key={plan.id}
                className={`w-full shadow-none ${plan.id === 'starter' && 'outline outline-2 outline-primary/50'}`}
              >
                <CardContent className="flex flex-col justify-between gap-4">
                  <div className="flex flex-col justify-center gap-5">
                    <div className="flex flex-col gap-2 pt-4">
                      <h3 className="text-lg font-normal">{plan.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:hidden">
                      <div className="flex items-end">
                        <span className="text-3xl font-normal text-primary">
                          ${price}
                        </span>
                        <span className="ml-1 text-lg text-muted-foreground">
                          /{period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end max-sm:hidden">
                    <div className="flex flex-col items-end">
                      <div className="flex items-end">
                        <span className="text-3xl font-normal text-primary">
                          ${price}
                        </span>
                        <span className="ml-1 text-lg text-muted-foreground">
                          /{period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`$ w-fit ${plan.id === 'starter' && 'opacity-20'}`}
                  >
                    {plan.id === 'starter' ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="lg:w-1/2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-normal">
              Billing History
            </CardTitle>
            <CardDescription>Your past invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center text-gray-500">
              <p className="mb-4">No billing history available</p>
              <p className="text-sm">
                Invoices will appear here once you upgrade to a paid plan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
