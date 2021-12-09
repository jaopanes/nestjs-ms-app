import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:sWRK^slG^^dR@cluster0.715lw.mongodb.net/SmartRanking_NESTJS?retryWrites=true&w=majority'),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
