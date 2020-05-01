class OffersController < ApplicationController
  before_action :set_offer, only: [:show, :edit, :update, :destroy]

  # GET /offers
  # GET /offers.json
  def index
    offers=[]
    owner = helpers.current_owner
    if owner
      (@filterrific = initialize_filterrific(
          Offer.offers_by_owner(owner),
          params[:filterrific],
          select_options: {
              search_status: Offer.offer_status.options,
          },
          )) || return
      offers = @filterrific.find.page(params[:page])
      respond_to do |format|
        format.html
        format.js
      end
    end
    render :index, locals: {offers: offers, filterrific: @filterrific}
  end

  # GET /offers/1
  # GET /offers/1.json
  def show
  end

  # GET /offers/new
  def new
    @offer = Offer.new
    owner = helpers.current_owner
    estates = Estate.only_published.estates_by_owner(owner.id)
    offer_details = @offer.offer_details.build
    estate_name = nil
    if params[:tag_estate_id].present? then
      estate_name = Estate.find_by(id: params[:tag_estate_id]).name
      @offer.estate_id = params[:tag_estate_id]
    end
    render :new, locals: {offer_details: offer_details, estates: estates, estate_name: estate_name}

  end

  # GET /offers/1/edit
  def edit
  end

  # POST /offers
  # POST /offers.json
  def create
    @offer = Offer.new(offer_params)

    respond_to do |format|
      if @offer.save
        format.html { redirect_to @offer, notice: 'Offer was successfully created.' }
        format.json { render :show, status: :created, location: @offer }
      else
        format.html { render :new }
        format.json { render json: @offer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /offers/1
  # PATCH/PUT /offers/1.json
  def update
    respond_to do |format|
      if @offer.update(offer_params)
        format.html { redirect_to @offer, notice: 'Offer was successfully updated.' }
        format.json { render :show, status: :ok, location: @offer }
      else
        format.html { render :edit }
        format.json { render json: @offer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /offers/1
  # DELETE /offers/1.json
  def destroy
    @offer.destroy
    respond_to do |format|
      format.html { redirect_to offers_url, notice: 'Offer was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_offer
      @offer = Offer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def offer_params
      params.fetch(:offer, {})
    end
end
