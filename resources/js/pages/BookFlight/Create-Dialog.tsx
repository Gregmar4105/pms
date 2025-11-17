import { useState } from "react";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from '@inertiajs/react';

export default function CreateDialog() {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        flight_id: '',
        flight_number: '',
        airline_code: '',
        origin_code: '',
        destination_code: '',
        aircraft_icao_code: '',
        scheduled_departure_time: '',
        scheduled_arrival_time: '',
        fk_id_terminal_code: '',
        fk_id_gate_code: '',
        fk_id_belt_code: '',
        fk_id_status_code: '',
    });

    const [flights, setFlights] = useState([]);
    const [loadingFlights, setLoadingFlights] = useState(false);

    async function loadFlights() {
        setLoadingFlights(true);

        try {
            const res = await fetch('/get-flights');
            const result = await res.json();

            const flightsArray = Array.isArray(result)
                ? result.map(f => f.json ? f.json : f) 
                : [];

            setFlights(flightsArray);
        } catch (e) {
            setFlights([]);
        }

        setLoadingFlights(false);
    }

    // AUTO-FILL FLIGHT DETAILS
    const handleFlightSelect = (e) => {
        const id = e.target.value;

        const selected = flights.find(f => f.id == id);
        if (!selected) return;

        setData({
            ...data,
            flight_id: selected.id,
            flight_number: selected.flight_number,
            airline_code: selected.airline_code,
            origin_code: selected.origin_code,
            destination_code: selected.destination_code,
            aircraft_icao_code: selected.aircraft_icao_code,
            scheduled_departure_time: selected.scheduled_departure_time,
            scheduled_arrival_time: selected.scheduled_arrival_time,
            fk_id_terminal_code: selected.fk_id_terminal_code,
            fk_id_gate_code: selected.fk_id_gate_code,
            fk_id_belt_code: selected.fk_id_belt_code,
            fk_id_status_code: selected.fk_id_status_code,
        });
    };

    function submit(e) {
        e.preventDefault();
        post('/booked-flights', { onSuccess: () => reset() });
    }

    const getFlightDisplay = (f) =>
        f ? `${f.flight_number} (${f.origin_code} → ${f.destination_code})` : "Invalid Flight";

    return (
        <Dialog onOpenChange={(open) => open && loadFlights()}>
            <DialogTrigger asChild>
                <Button className="bg-orange-400 hover:bg-orange-500 ml-4 my-4 shadow-lg rounded-xl">
                    <Plus />
                    Book a Flight
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl p-6 bg-white rounded-2xl shadow-2xl">
                <DialogTitle className="text-2xl font-bold text-gray-800 border-b">
                    Book a New Flight
                </DialogTitle>
                <DialogDescription className="text-md">
                    Select a flight and enter the passenger name.
                </DialogDescription>

                <form onSubmit={submit}>
                    {/* SELECT FLIGHT */}
                    <div className="items-center gap-4">
                        <Label className="text-left font-semibold">Select Flight:</Label>

                        {loadingFlights ? (
                            <div className="col-span-3 space-y-2">
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </div>
                        ) : (
                            <select
                                id="flight_id"
                                name="flight_id"
                                value={data.flight_id}
                                onChange={handleFlightSelect}
                                className="mt-2 block w-full h-10 rounded-lg border-gray-300 shadow-sm"
                                required
                            >
                                <option value="" disabled>
                                    --- Choose a Flight ({flights.length}) ---
                                </option>

                                {flights.map(f => (
                                    <option key={f.id} value={f.id}>
                                        {getFlightDisplay(f)}
                                    </option>
                                ))}
                            </select>
                        )}

                        <InputError message={errors.flight_id} />
                    </div>

                    <DialogFooter className="gap-2 mt-6 border-t pt-4">
                        <DialogClose asChild>
                            <Button variant="secondary" type="button">Cancel</Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing || flights.length === 0}>
                            {processing ? 'Booking...' : 'Book Flight'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
