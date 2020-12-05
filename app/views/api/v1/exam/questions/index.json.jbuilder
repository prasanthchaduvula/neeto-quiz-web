# frozen_string_literal: true

json.questions @mocktest.questions.map do |question|
  json.id question.id
  json.description question.description

  json.options question.options.map do |option|
    json.id option.id
    json.name option.name
    json.is_correct option.is_correct
  end
end
