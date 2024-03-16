import { Table, Model, Column, DataType } from "sequelize-typescript";

//table name is declared here
@Table({
    timestamps: true,
    tableName: "Weather"
}) 

//here, the colums used in this modal is declared
export class WeatherModel extends Model{

    // col 1 (location)-----
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    locName!: String;
    // col 1 end----

    // col 2 -----
    // im not sure whether this float32arry class actually works or not/
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    temperature!: Float32Array;
    // col 2 ----

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    humidity!: Float32Array;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    airPressure!: Float32Array;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    weatherTag!: String;
}