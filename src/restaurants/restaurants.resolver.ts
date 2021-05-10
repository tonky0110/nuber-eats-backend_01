import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./ entities/restaurant.entity";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService){}

    @Query(returns => [Restaurant])
    restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
        return [];
    }
    
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() CreateRestaurantDto: CreateRestaurantDto
    ): boolean {
        return true;
    }
}