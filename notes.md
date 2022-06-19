<!-- Rabbit MQ -->
# Exchange type and use cases

producer/publisher ==(routing key)==> exchange ==(rules/binding)==> queues =>> consumer/subscriber

## Fanout Exchange
- ignores the routing key
- can send to any queue tied to the fanout exchange (broadcasting feature)

[p] -> [fanout] -> Q(s) (queues are bind to exchange)

#

## Direct Exchange
- queue needs to have same routing key as direct exchange

[p] -> (test) -> [direct exchange] -> Queue[test]

#

## Topic Exchange
- route messages base on pattern in routing key
- \# can have 0 or more item after the key example.# 
- \* refers to 1 word while \# refers to as many or optional

- *.example matches something.example, anything.example
- example.# matches example.a.b.c.d.e.f.g, example.example

#

## Header Exchanges
- similar to direct exchange but ignore routing key.