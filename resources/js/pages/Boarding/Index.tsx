import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowRightFromLine, CircleQuestionMark, UserRoundCheck, UserRoundX } from 'lucide-react';
import CreateDialog from './Create-Dialog';
import { Badge } from '@/components/ui/badge';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booked Flights',
        href: '/booked-flights',
    },
];

export default function Index({ boarding }) {

    const { post } = useForm();

    function handleSend(flight) {
      router.post('/booked-flights/board', {
          data: flight
      });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Booked Flights" />
      <div>
      </div>
      <div
        className="mx-4 bg-white border border-gray-200 
        dark:bg-primary-foreground px-4 py-2 rounded-lg"
      >
        <Table className="w-full">
          <TableCaption>List of Boarded Passengers in the System.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Passenger</TableHead>
              <TableHead>Flight Number</TableHead>
              <TableHead>Gate</TableHead>
              <TableHead>Passenger Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boarding.map(({id, user_id, flight_number, gate_code,passenger_status }) =>
              <TableRow key={id}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{user_id}</TableCell>
                <TableCell>{flight_number}</TableCell>
                <TableCell>{gate_code}</TableCell>
                <TableCell>
                  <Badge>
                  {passenger_status}
                  </Badge>
                  </TableCell>
                <TableCell>
                  <Button 
                    variant='default'
                    size="sm"
                    className='bg-green-500 hover:bg-green-600'
                    onClick={() => handleSend({
                      id,
                      user_id,
                      flight_number,
                      passenger_status: 'Checked-IN'
                    })}
                  >
                    <ArrowRightFromLine/>
                  </Button>

                  <Button 
                    variant='default'
                    size="sm"
                    className='ml-2 bg-orange-400 hover:bg-orange-600'
                    onClick={() => handleSend({
                      id,
                      user_id,
                      flight_number,
                      airline_code,
                      origin_code,
                      destination_code,
                      aircraft_icao_code,
                      gate_code,
                      baggage_code,
                      status_code,
                      scheduled_departure_time,
                      scheduled_arrival_time,
                      created_at_fis,
                      updated_at_fis,
                      passenger_status: 'Missing'
                    })}
                  >
                    <CircleQuestionMark />
                  </Button>

                  <Button 
                    variant='default'
                    size="sm"
                    className='ml-2 bg-red-600 hover:bg-red-700'
                    onClick={() => handleSend({
                      id,
                      user_id,
                      flight_number,
                      airline_code,
                      origin_code,
                      destination_code,
                      aircraft_icao_code,
                      gate_code,
                      baggage_code,
                      status_code,
                      scheduled_departure_time,
                      scheduled_arrival_time,
                      created_at_fis,
                      updated_at_fis,
                      passenger_status: 'Cancelled'
                    })}
                  >
                    <UserRoundX />
                  </Button>
                </TableCell> 
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}

