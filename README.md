

# Arduino Digital Clock

- [Arduino Digital Clock](#arduino-digital-clock)
  - [Single digit segment mapping](#single-digit-segment-mapping)
  - [4 Digit 7 Segment Pin Connection](#4-digit-7-segment-pin-connection)
- [Dependencies](#dependencies)
- [Installation](#installation)
  - [License](#license)

![Demo of working digital clock showing current time 22:48][demo]

This 4 digit 7 segment display is controlled from nodejs with `johnny-five` framework

## Single digit segment mapping

```

     A      
   -----    
  |     |   
F |     | B 
  |  G  |   
   -----    
  |     |   
E |     | C 
  |     |   
   -----    
     D      

```

## 4 Digit 7 Segment Pin Connection

| Type      | Arduino Pin | Display Pin |
| --------- | :---------: | :---------: |
| Segment A |      2      |     11      |
| Segment B |      3      |      7      |
| Segment C |      4      |      4      |
| Segment D |      5      |      2      |
| Segment E |      6      |      1      |
| Segment F |      7      |     10      |
| Segment G |      8      |      5      |
| Digit 1   |      9      |     12      |
| Digit 2   |     10      |      9      |
| Digit 3   |     11      |      8      |
| Digit 4   |     12      |      6      |

# Dependencies
* `nodejs`
  * `johnny-five`
  * `moment`

# Installation

1. `npm install -g firmata-party`
2. `firmata-party uno`
3. `npm i`
4. `node .`


[demo]: images/demo.jpg "Demo of working digital clock showing current time 22:48"

## License
Licensed under the [MIT License](LICENSE)