  module ApplicationHelper
  def controller?(*controller)
    controller.include?(params[:controller])
  end

  def action?(*action)
    action.include?(params[:action])
  end

  def link_to_add_fields(name, f, association, partial_param)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize , f: builder, partial_param: partial_param)
    end
    link_to(name, '#', class: "add_fields", data: {id: id, fields: fields.gsub("\n", "")})
  end

  def get_score_color(range)
    colors = %w(danger warning success)
    case range
    when 0..3
      colors.first
    when 4..8
      colors.second
    else
      colors.third
    end
  end
end
