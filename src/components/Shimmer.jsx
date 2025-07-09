const Shimmer = () => {
    return (
        <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-9">
            <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-6 w-2xs rounded bg-gray-200 mb-10"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-8 gap-4">
                            <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                            <div className="col-span-2 h-2 rounde"></div>
                            <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                            <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                            <div className="col-span-1 h-2 rounded bg-pink-300"></div>
                        </div>
                        <div className="grid grid-cols-8 gap-4 mt-6">
                            <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                            <div className="col-span-2 h-2 rounde"></div>
                            <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                            <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                            <div className="col-span-1 h-2 rounded bg-pink-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shimmer;
