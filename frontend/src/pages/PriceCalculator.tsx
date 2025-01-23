import { Card, CardContent,  CardFooter,  CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/ui/Header'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { rateList } from '@/constants/sample'

const PriceCalculator  = () => {

    const [material , setMaterial] = useState<string>('')
    const [weight,setWeight] = useState<string>('')
    const [totalPrice , setTotalPrice] = useState<number>(0)

    // function to calculate total price

    const calculatePrice = () =>{
        rateList.map((category) => {
             Object.values(category).map((materials) => {
                 materials.map((value) => (
                 value.name === material && weight ? setTotalPrice(value.rate * parseFloat(weight)) : 0
                ));
            });
        })   
    }


    return (
        <div className=' flex flex-col min-h-screen bg-gray-950 '>
            <Header/>
            <main className='container mx-auto px-4 py-12 pt-24'>
              <Card className=''>
                    <CardHeader>
                        <CardTitle>
                            Calulate Price
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Label htmlFor="material">Select Material</Label>
                        <Select onValueChange={setMaterial} defaultValue={material}>
                            <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a material" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    rateList.map((category, index) => {
                                    return Object.values(category).map((materials, materialIndex) => {
                                        return materials.map((value, valueIndex) => (
                                        <SelectItem value={value.name} key={`${index}-${materialIndex}-${valueIndex}`}>{value.name}</SelectItem>
                                        ));
                                    });
                                    })
                                }
                            </SelectContent>
                        </Select>
              
                        <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Enter weight in kg"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                        onClick={calculatePrice}
                        >Calculate Price</Button>
                        {
                        totalPrice !== 0 && (
                        <div className="mt-4 text-xl font-bold text-green-600">Total Price: ₹{totalPrice.toFixed(2)}</div>
                        )
                        }
                    </CardFooter>
                </Card>
            </main>
    </div>
    ) 
}

export default PriceCalculator