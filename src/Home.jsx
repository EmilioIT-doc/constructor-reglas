import React, { useState } from "react"
import { useForm } from "react-hook-form";
import CReateUser from "./pages/Triggers/CreateUser";
import PaymentReceived from "./pages/Triggers/PaymentReceived";
import TicketNoAnswer from "./pages/Triggers/TicketNoAnswer";

export default function Home() {

    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(0);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {
            update_status: true,
            status: false,
            name: "",
            trigger: "",
            country: "",
            plan: "",
            amount: 0,
            coin: "",
            time_out: 0,
            priority: "",
        },
    });

    function goToNextPage() {
        setCurrentPage(prevPage => prevPage + 1);
    }

    function goToBackPage() {
        setCurrentPage(prevPage => prevPage - 1);
    }

    const name = watch("name");
    const status = watch("status");

    return (
        <>
            <div class="w-full max-w-xs">
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {currentPage == 0 && (
                        <>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                                    Estado de la regla:
                                </label>
                                <span for="username">
                                    {status}
                                </span>
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                                    Nombre de la regla:
                                </label>
                                <span>{name}</span>
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                                    Status de la regla:
                                </label>
                                <select
                                        {...register("update_status")}
                                        defaultValue="">
                                        <option value="" disabled>Tipo de Status</option>
                                        <option value={true}>Activada</option>
                                        <option value={false}>Desactivada</option>
                                    </select>
                            </div>
                            <div class="flex items-center justify-between">
                                <button onClick={goToNextPage} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Editor de regla
                                </button>
                            </div>
                        </>
                    )}
                    {currentPage == 1 && (
                        <>
                            <form onSubmit={handleSubmit((data) => onSubmit({ ...data }))}>
                                <button onClick={goToBackPage} class=" text-black cursor-pointer pb-2">Back Page</button>
                                {/* El estado de mi regla:  */}
                                <div class="mb-4">
                                    <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                                        Estado de la regla:
                                    </label>
                                    <select
                                        {...register("status")}
                                        defaultValue="">
                                        <option value="" disabled>Estado de regla</option>
                                        <option value={true}>Activada</option>
                                        <option value={false}>Desactivada</option>
                                    </select>
                                </div>
                                {/* El nombre de mi regla: */}
                                <div class="mb-6">
                                    <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                                        Nombre de la regla:
                                    </label>
                                    <input
                                        type="name"
                                        placeholder="Nombre de tu regla"
                                        {...register("name", { required: true })}
                                    />
                                </div>
                                {/* El status de mi regla:  */}
                                <div class="mb-4">
                                    <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                                        Estado de la regla:
                                    </label>
                                    <select
                                        {...register("update_status")}
                                        defaultValue="">
                                        <option value="" disabled>Tipo de Status</option>
                                        <option value={true}>Activada</option>
                                        <option value={false}>Desactivada</option>
                                    </select>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                                        Disparador Actual:
                                    </label>
                                    <select
                                        type='text'
                                        name="isAvailable"
                                        className='itemAvailability form__input'
                                        value={trigger}
                                        onChange={(e) => setTrigger(e.target.value)}
                                    >
                                        <option value={1}>Cliente creado</option>
                                        <option value={2}>Pago recibido</option>
                                        <option value={3}>Ticker sin respuesta</option>
                                    </select>
                                </div>
                                {/* Esta es mi lista de componentes */}
                                {/* Con base al Trigger: */}
                                <div className="componentes py-8">
                                    {trigger == 1 && (
                                        <>
                                            <CReateUser />
                                        </>
                                    )}
                                    {trigger == 2 && (
                                        <>
                                            <PaymentReceived />
                                        </>
                                    )}
                                    {trigger == 3 && (
                                        <>
                                            <TicketNoAnswer />
                                        </>
                                    )}
                                </div>
                                <div class="flex items-center justify-between">
                                    <button typeof="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        Guardar regla
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}