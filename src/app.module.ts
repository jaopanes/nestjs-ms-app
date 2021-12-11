import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:sWRK^slG^^dR@cluster0.715lw.mongodb.net/SmartRanking_NESTJS?retryWrites=true&w=majority'),
    JogadoresModule,
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
