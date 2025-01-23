import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/Header";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rateList } from "@/constants/sample";

const PriceCalculator = () => {
  const [material, setMaterial] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Function to calculate total price
  const calculatePrice = () => {
    rateList.map((category) => {
      Object.values(category).map((materials) => {
        materials.map((value) =>
          value.name === material && weight ? setTotalPrice(value.rate * parseFloat(weight)) : 0
        );
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12 pt-24">
        <Card className="bg-gray-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 font-bold">Calculate Price</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Material Selection */}
            <div>
              <Label htmlFor="material" className="text-green-300 text-xl ">
                Select Material
              </Label>
              <Select onValueChange={setMaterial} defaultValue={material}>
                <SelectTrigger className="w-full bg-gray-700 text-gray-300">
                  <SelectValue placeholder="Select a material" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800">
                  {rateList.map((category, index) =>
                    Object.values(category).map((materials, materialIndex) =>
                      materials.map((value, valueIndex) => (
                        <SelectItem
                          value={value.name}
                          key={`${index}-${materialIndex}-${valueIndex}`}
                          className="hover:bg-green-500  text-gray-300"
                        >
                          {value.name}
                        </SelectItem>
                      ))
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Weight Input */}
            <div>
              <Label htmlFor="weight" className="text-green-300 text-xl">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
                className="w-full bg-gray-700 text-gray-300 border border-gray-600 focus:border-green-400"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button
              onClick={calculatePrice}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-gray-900 font-semibold rounded-md"
            >
              Calculate Price
            </Button>
            {totalPrice !== 0 && (
              <div className="mt-4 text-2xl font-bold text-green-400">
                Total Price: ₹{totalPrice.toFixed(2)}
              </div>
            )}
          </CardFooter>
        </Card>
      </main>

      <section className="container mx-auto px-6 py-12 pt-10">
  {rateList.map((item, indx) => {
    return Object.entries(item).map(([category, materials]) => (
      <Card key={indx} className="bg-gray-800 shadow-lg flex flex-col gap-6 mb-8">
        {/* Category Header */}
        <CardHeader className="flex items-center">
          <h1 className="text-3xl font-bold text-green-400">{category}</h1>
        </CardHeader>

        {/* Materials Grid */}
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {materials.map((material, index) => (
            <Card
              key={index}
              className="bg-gray-700 text-gray-300 flex flex-col items-start justify-between h-48 p-4 shadow-md rounded-md"
            >
              {/* Material Image */}
              <img
                src={material.image}
                alt={material.name}
                className="h-24 w-full object-cover rounded-md mb-3"
              />
              {/* Material Details */}
              <div className="flex flex-col  items-start ">
                <h2 className="text-lg font-bold text-green-300">{material.name}</h2>
                <p className="text-sm">
                Rate: <span className="text-green-400">{`₹${material.rate}/${material.unit}`}</span>
                </p>
                
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    ));
  })}
</section>


    </div>
  );
};

export default PriceCalculator;
