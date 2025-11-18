import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Head, Link, useForm, router } from '@inertiajs/react';
import { CircleQuestionMark, UserRoundCheck, UserRoundX } from 'lucide-react';
import CreateDialog from './Create-Dialog';
import { Badge } from '@/components/ui/badge';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booked Flights',
        href: '/booked-flights',
    },
];

export default function Index({ bookedflights, flights }) {

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
      <CreateDialog />
      </div>
      <div
        className="mx-4 bg-white border border-gray-200 
        dark:bg-primary-foreground px-4 py-2 rounded-lg"
      >
        <Table className="w-full">
          <TableCaption>List of Flights in the System.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Passenger</TableHead>
              <TableHead>Flight Number</TableHead>
              <TableHead>Airline Code</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Aircraft</TableHead>
              <TableHead>Gate</TableHead>
              <TableHead>Baggage Claim</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookedflights.map(({id, user_id, flight_number, airline_code, origin_code, 
            destination_code, aircraft_icao_code, gate_code, baggage_code, status_code, scheduled_departure_time, 
            scheduled_arrival_time, created_at_fis, updated_at_fis }) =>
              <TableRow key={id}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{user_id}</TableCell>
                <TableCell>{flight_number}</TableCell>
                <TableCell>{airline_code}</TableCell>
                <TableCell>{origin_code}</TableCell>
                <TableCell>{destination_code}</TableCell>
                <TableCell>{aircraft_icao_code}</TableCell>
                <TableCell>{gate_code}</TableCell>
                <TableCell>{baggage_code}</TableCell>
                <TableCell>
                  <Badge>
                  {status_code}
                  </Badge>
                  </TableCell>
                <TableCell>{scheduled_departure_time}</TableCell>
                <TableCell>{scheduled_arrival_time}</TableCell>

                <TableCell>
                  <Button 
                    variant='default'
                    size="sm"
                    className='bg-green-500 hover:bg-green-600'
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
                      passenger_status: 'Checked-IN'
                    })}
                  >
                    <UserRoundCheck/>
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

