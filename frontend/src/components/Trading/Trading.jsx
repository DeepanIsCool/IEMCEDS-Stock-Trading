import React from 'react'
import { CandleSeries, Crosshair, DateTime,Inject, LineSeries, StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';


const Trading = () => {
  return (
    <div>
      <StockChartComponent title='Stock Price Analysis' crosshair={{enable:true, lineType:'Both'}} 
        primaryXAxis={{
          crosshairTooltip:{enable:true}
        }}
        tooltip={{enable:true}} 
        enableSelector={false}
        periods={[
         { text: '12H', interval: 12, intervalType: 'Hours', selected: true }
        ]}
        enablePeriodSelector={false}>
      <StockChartSeriesCollectionDirective>
        <StockChartSeriesDirective dataSource={chartData} type='Candle' xName='x'>
        </StockChartSeriesDirective>
      </StockChartSeriesCollectionDirective>
      <Inject services={[DateTime, Tooltip, Crosshair,  CandleSeries,LineSeries, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
      </StockChartComponent>
    </div>
  )
}

export default Trading