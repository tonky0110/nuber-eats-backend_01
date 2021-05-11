import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./ entities/restaurant.entity";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService){}

    @Query(returns => [Restaurant])
    restaurants(): Promise<Restaurant[]> {
        return this.restaurantService.getAll();
    }
    
    @Mutation(returns => Boolean)
    async createRestaurant(
        @Args('input') createRestaurantDto: CreateRestaurantDto
    ): Promise<boolean> {
        try {
            this.restaurantService.createRestaurant(createRestaurantDto);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    @Mutation(returns => Boolean)
    async updateRestaurant(
        @Args('id') id: number,
        @Args('data') data: UpdateRestaurantDto 
    ) {
        return true;
    }
}